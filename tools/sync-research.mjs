import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const researchDir = path.join(root, '_research');
const fallbackPath = path.join(root, 'assets', 'data', 'research-fallback.json');
const validCategories = new Set([
  'Behavior',
  'New species / Taxonomy',
  'General arachnology news',
  'Ecology',
  'Venom',
  'Captive relevance',
]);
const requiredFields = [
  'title',
  'category',
  'posted_date',
  'source_date',
  'summary',
  'why_it_matters',
  'source_url',
];

function decodeScalar(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    const quote = trimmed[0];
    const inner = trimmed.slice(1, -1);
    return quote === '"' ? inner.replace(/\\"/g, '"').replace(/\\n/g, '\n') : inner.replace(/''/g, "'");
  }
  return trimmed;
}

function parseFrontMatter(filePath) {
  const source = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  if (!source.startsWith('---')) throw new Error(`${path.relative(root, filePath)}: missing YAML front matter`);

  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`${path.relative(root, filePath)}: malformed YAML front matter`);

  const frontMatter = {};
  let currentKey = null;
  for (const rawLine of match[1].split(/\r?\n/)) {
    if (!rawLine.trim() || rawLine.trimStart().startsWith('#')) continue;
    const keyMatch = rawLine.match(/^([A-Za-z0-9_]+):(?:\s*(.*))?$/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      frontMatter[currentKey] = decodeScalar(keyMatch[2] ?? '');
      continue;
    }
    if (/^\s+/.test(rawLine) && currentKey) {
      const continuation = rawLine.trim();
      if (continuation) frontMatter[currentKey] = `${frontMatter[currentKey]} ${decodeScalar(continuation)}`.trim();
      continue;
    }
    throw new Error(`${path.relative(root, filePath)}: unsupported front-matter line: ${rawLine}`);
  }

  return { frontMatter, body: match[2].trim() };
}

function normalizedSlug(filename) {
  return filename
    .replace(/\.md$/i, '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseIsoDate(value, label, filename) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${filename}: ${label} must use YYYY-MM-DD: ${value}`);
  }
  const parsed = Date.parse(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed)) throw new Error(`${filename}: ${label} is not a valid date: ${value}`);
  return parsed;
}

function displayDate(value) {
  const date = new Date(`${value}T00:00:00Z`);
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}

function buildEntries() {
  if (!fs.existsSync(researchDir)) throw new Error('_research directory does not exist');
  const files = fs.readdirSync(researchDir).filter((name) => name.toLowerCase().endsWith('.md')).sort();
  const entries = [];
  const slugs = new Set();

  for (const filename of files) {
    const filePath = path.join(researchDir, filename);
    const { frontMatter, body } = parseFrontMatter(filePath);
    for (const field of requiredFields) {
      if (!frontMatter[field]) throw new Error(`${filename}: missing required field "${field}"`);
    }
    if (!validCategories.has(frontMatter.category)) {
      throw new Error(`${filename}: invalid category "${frontMatter.category}"`);
    }
    try {
      new URL(frontMatter.source_url);
    } catch {
      throw new Error(`${filename}: invalid source_url "${frontMatter.source_url}"`);
    }

    const slug = normalizedSlug(filename);
    if (!slug) throw new Error(`${filename}: could not derive a slug`);
    if (slugs.has(slug)) throw new Error(`${filename}: duplicate slug "${slug}"`);
    slugs.add(slug);

    const sourceSort = parseIsoDate(frontMatter.source_date, 'source_date', filename);
    const postedSort = parseIsoDate(frontMatter.posted_date, 'posted_date', filename);

    entries.push({
      title: frontMatter.title,
      description: frontMatter.description || '',
      category: frontMatter.category,
      posted_date: displayDate(frontMatter.posted_date),
      source_date: displayDate(frontMatter.source_date),
      summary: frontMatter.summary,
      why_it_matters: frontMatter.why_it_matters,
      source_url: frontMatter.source_url,
      source_name: frontMatter.source_name || '',
      slug,
      url: `research/${slug}/`,
      has_body: Boolean(body),
      _sourceSort: sourceSort,
      _postedSort: postedSort,
    });
  }

  entries.sort((a, b) => b._sourceSort - a._sourceSort || b._postedSort - a._postedSort || a.title.localeCompare(b.title));
  return entries.map(({ _sourceSort, _postedSort, ...entry }) => entry);
}

function serialized(entries) {
  return `${JSON.stringify(entries, null, 2)}\n`;
}

function main() {
  const write = process.argv.includes('--write');
  const entries = buildEntries();
  const expected = serialized(entries);
  const existing = fs.existsSync(fallbackPath) ? fs.readFileSync(fallbackPath, 'utf8').replace(/\r\n/g, '\n') : '';

  if (write) {
    fs.mkdirSync(path.dirname(fallbackPath), { recursive: true });
    fs.writeFileSync(fallbackPath, expected, 'utf8');
    console.log(`Research preview data updated from ${entries.length} canonical _research entries.`);
    return;
  }

  if (existing !== expected) {
    console.error('Research preview data is out of sync with _research/.');
    console.error('Run: node tools/sync-research.mjs --write');
    process.exit(1);
  }

  console.log(`Research data is in sync: ${entries.length} entries validated.`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
