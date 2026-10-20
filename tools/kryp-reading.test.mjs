import test from 'node:test';
import assert from 'node:assert/strict';
import { createNarrator, norwegianVoice, speechChunks } from '../assets/kryp-reader.mjs';

function setup(voices = [{ lang: 'nb-NO', name: 'Norsk' }]) {
  const spoken = [], states = [], timers = new Map(), audios = [];
  let serial = 0;
  const synthesis = { getVoices: () => voices, cancel() {}, speak(utterance) { spoken.push(utterance); } };
  class Utterance { constructor(text) { this.text = text; } }
  const player = createNarrator({
    synthesis, Utterance,
    createAudio(src) {
      const audio = { src, paused: true, play() { this.paused = false; return Promise.resolve(); }, pause() { this.paused = true; } };
      audios.push(audio);
      return audio;
    },
    onChange: state => states.push(state),
    schedule: callback => { timers.set(++serial, callback); return serial; },
    unschedule: id => timers.delete(id)
  });
  return { player, synthesis, spoken, states, timers, audios, get state() { return states.at(-1); } };
}
const entries = [{ text: 'Edderkoppen har åtte bein. Fire på hver side.', element: 'paragraph' }];

test('Norwegian selection does not silently substitute an English voice', () => {
  assert.equal(norwegianVoice([{ lang: 'en-US' }]), null);
  assert.equal(norwegianVoice([{ lang: 'nn-NO' }, { lang: 'nb-NO' }]).lang, 'nb-NO');
  assert.equal(norwegianVoice([{ lang: 'no_NO' }]).lang, 'no_NO');
});

test('long text is split without losing words, and retains its paragraph for highlighting', () => {
  const text = Array.from({ length: 100 }, (_, i) => 'ord' + i).join(' ');
  const chunks = speechChunks([{ text, element: 'p' }]);
  assert.equal(chunks.map(chunk => chunk.text).join(' '), text);
  assert(chunks.every(chunk => chunk.text.length <= 230 && chunk.element === 'p'));
});

test('playback advances through sentences and clears highlighting after the last one', () => {
  const s = setup();
  s.player.toggle('one', entries);
  assert.equal(s.state.state, 'loading');
  s.spoken[0].onstart();
  assert.equal(s.state.element, 'paragraph');
  s.spoken[0].onend();
  assert.equal(s.spoken[1].text, 'Fire på hver side.');
  s.spoken[1].onstart(); s.spoken[1].onend();
  assert.equal(s.state.state, 'idle');
  assert.equal(s.state.element, null);
  assert.equal(s.timers.size, 0);
});

test('late callbacks from an old profile cannot restart it after another is selected', () => {
  const s = setup();
  s.player.toggle('old', entries); const old = s.spoken[0];
  s.player.toggle('new', [{ text: 'Ny profil.', element: 'new' }]);
  old.onstart(); old.onend(); old.onerror();
  assert.equal(s.spoken.length, 2);
  assert.equal(s.state.id, 'new');
});

test('pause and continue repeat only the current sentence, including on devices without speech pause support', () => {
  const s = setup();
  s.player.toggle('one', entries);
  s.spoken[0].onstart(); s.spoken[0].onend();
  const old = s.spoken[1]; old.onstart();
  s.player.toggle('one', entries);
  assert.equal(s.state.state, 'paused');
  old.onend();
  s.player.toggle('one', entries);
  assert.equal(s.spoken.at(-1).text, 'Fire på hver side.');
  s.spoken.at(-1).onstart();
  s.player.stop();
  assert.equal(s.timers.size, 0);
});

test('missing Norwegian speech and blocked startup produce useful failure states', () => {
  const missing = setup([{ lang: 'en-GB' }]);
  missing.player.toggle('one', entries);
  assert.equal(missing.spoken.length, 0);
  assert.match(missing.state.problem, /norsk stemme/);
  const blocked = setup();
  blocked.player.toggle('one', entries);
  [...blocked.timers.values()][0]();
  assert.equal(blocked.state.state, 'error');
});

test('a keeper recording works even when device speech has no Norwegian voice', () => {
  const s = setup([]);
  s.player.toggle('one', entries, '/assets/kryp/audio/anatomy-intro.mp3');
  assert.equal(s.spoken.length, 0);
  s.audios[0].onplaying();
  assert.equal(s.state.state, 'playing');
  s.player.toggle('one', entries);
  assert.equal(s.audios[0].paused, true);
  assert.equal(s.state.state, 'paused');
  s.player.toggle('one', entries);
  s.audios[0].onplaying();
  s.audios[0].onended();
  assert.equal(s.state.state, 'idle');
});

test('a missing recording falls back to Norwegian device speech and ignores stale audio callbacks', () => {
  const s = setup();
  s.player.toggle('one', entries, '/assets/kryp/audio/missing.mp3');
  const audio = s.audios[0]; audio.onerror();
  assert.equal(s.spoken.length, 1);
  audio.onplaying(); audio.onended();
  assert.equal(s.state.state, 'loading');
  s.spoken[0].onstart();
  assert.equal(s.state.state, 'playing');
  s.player.stop();
});

test('rate changes restart the current speech sentence and stop removes every pending timer', () => {
  const s = setup();
  s.player.toggle('one', entries); s.spoken[0].onstart();
  s.player.setRate(0.75);
  assert.equal(s.spoken[1].rate, 0.75);
  assert.equal(s.spoken[1].text, s.spoken[0].text);
  s.player.stop();
  s.spoken[1].onend();
  assert.equal(s.spoken.length, 2);
  assert.equal(s.timers.size, 0);
});
