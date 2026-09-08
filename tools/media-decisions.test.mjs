import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
test('rejected videos cannot return to pages or weekly content',()=>{
  const files=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')),...['_kryp_weekly','_kryp_weekly_queue','_layouts'].flatMap(dir=>fs.readdirSync(path.join(root,dir)).map(f=>path.join(dir,f)))];
  for(const f of files) assert.doesNotMatch(fs.readFileSync(path.join(root,f),'utf8'),/cockroaches-bark\.mp4|otter-water\.mp4/,f);
  for(const f of ['cockroaches-bark.mp4','otter-water.mp4']) assert.equal(fs.existsSync(path.join(root,'assets/kryp/video',f)),false);
});
test('Huggorm precedes the existing cockroach article and is not queued again',()=>{
  const entries=fs.readdirSync(path.join(root,'_kryp_weekly')).sort();
  const h=entries.find(f=>f.includes('huggormen')),c=entries.find(f=>f.includes('hvem-gjemmer'));
  assert.equal(Date.parse(c.slice(0,10))-Date.parse(h.slice(0,10)),7*86400000);
  assert.equal(entries.indexOf(c),entries.indexOf(h)+1);
  assert.equal(entries.at(-1),'2026-09-06-ruby-vever-et-sansekart.md');
  assert.equal(fs.readdirSync(path.join(root,'_kryp_weekly_queue')).some(f=>/huggorm|dubia/.test(f)),false);
});
