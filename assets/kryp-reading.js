import { createNarrator, norwegianVoice } from './kryp-reader.mjs';

const body = document.body;
const main = document.querySelector('main');
if (main && !document.querySelector('.kk-reading-bar')) {
  const getPreference = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const savePreference = (key, value) => { try { localStorage.setItem(key, value); } catch { /* Reading still works without storage. */ } };
  const bar = document.createElement('aside');
  bar.className = 'kk-reading-bar kk-wrap';
  bar.setAttribute('aria-label', 'Lesestøtte');
  bar.innerHTML = '<div class="kk-reading-options"><span>Les på din måte</span><button type="button" data-reading-size aria-pressed="false"><span aria-hidden="true">Aa</span> Større tekst</button><label>Lesetempo <select data-reading-rate><option value="0.75">Rolig</option><option value="0.9" selected>Vanlig</option><option value="1.1">Raskere</option></select></label></div><p data-reading-availability>Du kan velge større tekst og lytte til forklaringene.</p>';
  main.before(bar);
  const sizeButton = bar.querySelector('[data-reading-size]');
  const setSize = enlarged => {
    body.classList.toggle('kk-large-text', enlarged);
    sizeButton.setAttribute('aria-pressed', String(enlarged));
  };
  setSize(getPreference('kk-large-text') === 'true');
  sizeButton.addEventListener('click', () => {
    const enlarged = !body.classList.contains('kk-large-text');
    setSize(enlarged);
    savePreference('kk-large-text', String(enlarged));
  });

  const readers = new Map();
  let recordings = {};
  let currentHighlight;
  let playback = { id: null, state: 'idle' };
  const synth = window.speechSynthesis;
  const available = id => Boolean(recordings[id] || (window.SpeechSynthesisUtterance && norwegianVoice(synth?.getVoices())));
  const updateControls = () => {
    readers.forEach((reader, id) => {
      const current = playback.id === id;
      const running = current && ['playing', 'paused', 'loading'].includes(playback.state);
      const label = current && playback.state === 'playing' ? 'Pause' : current && playback.state === 'paused' ? 'Fortsett' : current && playback.state === 'loading' ? 'Laster …' : 'Lytt';
      reader.play.textContent = label;
      reader.play.setAttribute('aria-label', label + ': ' + reader.title);
      reader.play.disabled = !available(id) || (current && playback.state === 'loading');
      reader.stop.disabled = !running;
      reader.controls.hidden = !available(id);
      reader.status.textContent = current && playback.problem ? playback.problem : current && playback.state === 'paused' ? 'På pause.' : '';
    });
    rate.closest('label').hidden = ![...readers.keys()].some(available);
    bar.querySelector('[data-reading-availability]').textContent = norwegianVoice(synth?.getVoices()) ? 'Velg «Lytt» ved teksten du vil høre. Du styrer tempoet selv.' : Object.keys(recordings).length ? 'Velg «Lytt» ved tekster som har et lydopptak.' : 'Større tekst er tilgjengelig. Opplesing trenger en norsk stemme på enheten.';
  };
  const narrator = createNarrator({
    synthesis: synth,
    Utterance: window.SpeechSynthesisUtterance,
    createAudio: src => new Audio(src),
    onChange: state => {
      playback = state;
      currentHighlight?.classList.remove('kk-reading-current');
      currentHighlight = state.element;
      currentHighlight?.classList.add('kk-reading-current');
      updateControls();
    }
  });
  const rate = bar.querySelector('[data-reading-rate]');
  const savedRate = getPreference('kk-reading-rate');
  if (['0.75', '0.9', '1.1'].includes(savedRate)) rate.value = savedRate;
  narrator.setRate(rate.value);
  rate.addEventListener('change', () => {
    narrator.setRate(rate.value);
    savePreference('kk-reading-rate', rate.value);
  });

  function register(root, id, anchor) {
    if (readers.has(id)) return;
    const title = root.querySelector('h1,h2,h3')?.textContent.trim() || 'Forklaring';
    const controls = document.createElement('div');
    controls.className = 'kk-read-controls';
    controls.innerHTML = '<button type="button" data-read-play>Lytt</button><button type="button" data-read-stop disabled>Stopp</button><span class="kk-read-status" role="status"></span>';
    if (anchor) anchor.after(controls); else root.prepend(controls);
    const reader = { root, title, controls, play: controls.querySelector('[data-read-play]'), stop: controls.querySelector('[data-read-stop]'), status: controls.querySelector('.kk-read-status') };
    reader.stop.setAttribute('aria-label', 'Stopp: ' + title);
    readers.set(id, reader);
    reader.play.addEventListener('click', () => {
      const entries = [...root.querySelectorAll('[data-read-text],h1,h2,h3,p,li')]
        .filter(element => !element.closest('.kk-read-controls,.kryp-latin,.kryp-eyebrow,.kk-kicker,.kryp-profile-links,.kryp-tina-label,[data-no-read],.kk-reading-options') && element.getClientRects().length && !element.querySelector('h1,h2,h3,p,li,[data-read-text]'))
        .map(element => ({ element, text: element.textContent.trim() }));
      document.querySelectorAll('video').forEach(video => video.pause());
      narrator.toggle(id, entries, recordings[id]);
    });
    reader.stop.addEventListener('click', () => narrator.stop());
  }
  document.querySelectorAll('[data-read-block]').forEach(root => register(root, root.dataset.readBlock, root.querySelector('h1,h2,h3')));
  document.querySelectorAll('.kryp-profile').forEach(profile => {
    const copy = profile.querySelector('.kryp-profile-copy');
    if (copy) register(copy, 'profile-' + profile.id, copy.querySelector('.kryp-profile-lede,h2'));
  });
  const weeklyProse = document.querySelector('.kryp-weekly-prose');
  if (weeklyProse) register(weeklyProse, 'weekly-' + location.pathname.split('/').filter(Boolean).pop());
  window.addEventListener('hashchange', () => narrator.stop());
  window.addEventListener('pagehide', () => narrator.stop());
  window.addEventListener('kk:stop-reading', () => narrator.stop());
  document.addEventListener('play', event => { if (event.target.tagName === 'VIDEO') narrator.stop(); }, true);
  synth?.addEventListener?.('voiceschanged', updateControls);
  updateControls();
  fetch('/assets/data/kryp-narration.json').then(response => response.ok ? response.json() : {}).then(data => {
    recordings = Object.fromEntries(Object.entries(data.recordings || {}).filter(([, src]) => typeof src === 'string' && /^\/assets\/kryp\/audio\/[a-z0-9/_-]+\.(?:mp3|m4a|ogg|wav)$/.test(src)));
    updateControls();
  }).catch(() => { /* Device narration and text settings remain available. */ });
}
