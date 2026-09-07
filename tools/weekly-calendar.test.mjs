import test from 'node:test';
import assert from 'node:assert/strict';
import { dateStamp, weekKey, publicationBlocked } from './weekly-calendar.mjs';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

test('manual reruns and the Monday boundary cannot consume another animal', () => {
  for (const date of ['2026-09-06', '2026-09-07', '2026-09-12']) {
    assert.equal(publicationBlocked(date, ['2026-09-06']), true);
  }
  assert.equal(publicationBlocked('2026-09-13', ['2026-09-06']), false);
});
test('same ISO week is blocked including year rollover', () => {
  assert.equal(weekKey('2027-01-01'), weekKey('2026-12-28'));
  assert.equal(publicationBlocked('2027-01-03', ['2026-12-28']), true);
  assert.equal(publicationBlocked('2027-01-04', ['2026-12-28']), false);
});
test('invalid dates cannot silently normalize into another week', () => {
  for (const date of ['2026-02-30', 'no-date', '2026-13-01']) assert.throws(() => dateStamp(date));
});
test('publisher consumes Huggorm then Dubia, never twice in one week', () => {
  const root=fs.mkdtempSync(path.join(os.tmpdir(),'weekly-publisher-'));
  try {
    for (const dir of ['tools','_kryp_weekly','_kryp_weekly_queue']) fs.mkdirSync(path.join(root,dir));
    for (const file of ['publish-next-kryp-weekly.mjs','weekly-calendar.mjs']) fs.copyFileSync(fileURLToPath(new URL(file,import.meta.url)),path.join(root,'tools',file));
    for (const file of ['image.jpg','index.html','sheet.png','colouring.html']) fs.writeFileSync(path.join(root,file),'fixture');
    fs.writeFileSync(path.join(root,'_kryp_weekly','ruby.md'),'---\ntitle: Ruby\ndate: 2026-09-06 10:00:00 +0200\n---\n');
    for (const [i,title] of ['Huggorm','Dubia'].entries()) fs.writeFileSync(path.join(root,'_kryp_weekly_queue',`00${i+1}-${title}.md`),`---\ntitle: ${title}\nimage: /image.jpg\nlink_url: /index.html\ncolouring_url: /colouring.html\ncolouring_image: /sheet.png\ncolouring_image_alt: Sheet\n---\n`);
    const run=date=>execFileSync(process.execPath,[path.join(root,'tools/publish-next-kryp-weekly.mjs'),'--date='+date],{encoding:'utf8'});
    assert.match(run('2026-09-07'),/queue unchanged/);
    assert.match(run('2026-09-13'),/Published 001-Huggorm/);
    assert.match(run('2026-09-13'),/queue unchanged/);
    assert.match(run('2026-09-14'),/queue unchanged/);
    assert.match(run('2026-09-20'),/Published 002-Dubia/);
    assert.equal(fs.readdirSync(path.join(root,'_kryp_weekly_queue')).length,0);
  } finally { fs.rmSync(root,{recursive:true,force:true}); }
});
