import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source = fs.readFileSync(new URL('../assets/kryp-colouring.js', import.meta.url), 'utf8');

function setup(decode) {
  let click, afterprint, printed = 0, errorMessage;
  const classes = new Set();
  const sheet = { id: 'chosen', classList: { add: x => classes.add(x), remove: x => classes.delete(x) }, toggleAttribute() {}, querySelectorAll: () => [{ decode }] };
  const button = { dataset: { printSheet: 'chosen' }, disabled: false, setAttribute() {}, removeAttribute() {}, addEventListener: (_, f) => { click = f; }, parentElement: { querySelector: () => null, append: el => { errorMessage = el.textContent; } } };
  const document = { body: { dataset: {}, removeAttribute() { delete this.dataset.printSheet; } }, fonts: { ready: Promise.resolve() }, getElementById: () => sheet,
    querySelectorAll: selector => selector === '[data-print-sheet]' ? [button] : selector === '.colouring-sheet' ? [sheet] : classes.has('is-print-target') ? [sheet] : [],
    createElement: () => ({ dataset: {}, setAttribute() {} }) };
  const window = { addEventListener: (_, f) => { afterprint = f; }, print: () => { printed++; } };
  vm.runInNewContext(source, { document, window });
  return { click: () => click(), cancel: () => afterprint(), document, button, get printed() { return printed; }, get error() { return errorMessage; } };
}

test('print waits for image decoding and clears the selection after the dialog closes', async () => {
  let ready;
  const state = setup(() => new Promise(resolve => { ready = resolve; }));
  const pending = state.click();
  assert.equal(state.printed, 0);
  assert.equal(state.button.disabled, true);
  ready(); await pending;
  assert.equal(state.printed, 1);
  assert.equal(state.document.body.dataset.printSheet, 'chosen');
  state.cancel();
  assert.equal(state.document.body.dataset.printSheet, undefined);
  assert.equal(state.button.disabled, false);
});

test('failed image loading shows a useful message instead of opening a blank print job', async () => {
  const state = setup(() => Promise.reject(new Error('network')));
  await state.click();
  assert.equal(state.printed, 0);
  assert.match(state.error, /nettf/);
  assert.equal(state.button.disabled, false);
});
