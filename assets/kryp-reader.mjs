// Playback state is independent of the page, so recorded and synthetic voices
// share the same controls and stale media callbacks cannot restart old content.
export function norwegianVoice(voices = []) {
  return voices.find(voice => /^nb(?:[-_]|$)/i.test(voice.lang))
    || voices.find(voice => /^(?:no|nn)(?:[-_]|$)/i.test(voice.lang))
    || null;
}

export function speechChunks(entries) {
  return entries.flatMap(entry => {
    const sentences = entry.text.replace(/\s+/g, ' ').trim().match(/[^.!?]+[.!?]*(?:\s|$)/g) || [];
    return sentences.flatMap(sentence => {
      const words = sentence.trim().split(/\s+/);
      const chunks = [];
      let text = '';
      words.forEach(word => {
        if (text && text.length + word.length > 230) {
          chunks.push({ text, element: entry.element });
          text = '';
        }
        text += (text ? ' ' : '') + word;
      });
      if (text) chunks.push({ text, element: entry.element });
      return chunks;
    });
  });
}

export function createNarrator({ synthesis, Utterance, createAudio, onChange = () => {}, schedule = setTimeout, unschedule = clearTimeout }) {
  let active = null;
  let serial = 0;
  let rate = 0.9;
  let startTimer;
  const valid = (job, token) => active === job && job.token === token;
  const clearTimer = () => { if (startTimer) unschedule(startTimer); startTimer = null; };
  const report = (job, state, problem = '') => {
    if (job) job.state = state;
    onChange({ id: job?.id || null, state, element: state === 'playing' && job?.kind === 'speech' ? job.chunks[job.index]?.element : null, problem });
  };
  function stop(problem = '') {
    clearTimer();
    const previous = active;
    active = null;
    serial++;
    previous?.audio?.pause();
    if (previous?.kind === 'speech') synthesis?.cancel();
    report(previous, problem ? 'error' : 'idle', problem);
  }
  function speak(job) {
    if (active !== job) return;
    if (job.index >= job.chunks.length) { stop(); return; }
    const voice = norwegianVoice(synthesis?.getVoices());
    if (!voice || !Utterance) { stop('Ingen norsk stemme er tilgjengelig her. Du kan fortsatt lese teksten og utforske bildene.'); return; }
    job.kind = 'speech';
    const token = job.token = ++serial;
    const utterance = new Utterance(job.chunks[job.index].text);
    job.utterance = utterance;
    utterance.lang = voice.lang;
    utterance.voice = voice;
    utterance.rate = rate;
    utterance.onstart = () => { if (valid(job, token)) { clearTimer(); report(job, 'playing'); } };
    utterance.onend = () => {
      if (!valid(job, token)) return;
      clearTimer();
      job.index++;
      speak(job);
    };
    utterance.onerror = () => { if (valid(job, token)) stop('Opplesingen stoppet. Prøv igjen, eller les teksten nedenfor.'); };
    report(job, 'loading');
    startTimer = schedule(() => { if (valid(job, token)) stop('Opplesingen kunne ikke starte på denne enheten.'); }, 8000);
    try { synthesis.speak(utterance); }
    catch { stop('Opplesingen kunne ikke starte på denne enheten.'); }
  }
  function useSpeech(job) {
    if (active !== job) return;
    job.audio?.pause();
    job.audio = null;
    speak(job);
  }
  function play(id, entries, recording) {
    stop();
    const job = active = { id, chunks: speechChunks(entries), index: 0, kind: 'speech', token: ++serial, state: 'loading' };
    if (!job.chunks.length) { stop('Det er ingen synlig tekst å lese her.'); return; }
    if (!recording) { speak(job); return; }
    job.kind = 'audio';
    const token = job.token;
    const audio = job.audio = createAudio(recording);
    audio.playbackRate = rate;
    audio.onplaying = () => { if (valid(job, token)) { clearTimer(); report(job, 'playing'); } };
    audio.onended = () => { if (valid(job, token)) stop(); };
    audio.onerror = () => { if (valid(job, token)) { clearTimer(); useSpeech(job); } };
    report(job, 'loading');
    startTimer = schedule(() => { if (valid(job, token)) useSpeech(job); }, 8000);
    Promise.resolve(audio.play()).catch(() => { if (valid(job, token)) { clearTimer(); useSpeech(job); } });
  }
  function toggle(id, entries, recording) {
    if (active?.id !== id || active.state === 'idle' || active.state === 'error') { play(id, entries, recording); return; }
    if (active.state === 'loading') { stop(); return; }
    const job = active;
    if (job.state === 'playing') {
      clearTimer();
      if (job.kind === 'audio') job.audio.pause();
      else { job.token = ++serial; synthesis.cancel(); }
      report(job, 'paused');
    } else if (job.state === 'paused') {
      if (job.kind === 'audio') {
        report(job, 'loading');
        Promise.resolve(job.audio.play()).catch(() => { if (active === job) useSpeech(job); });
      } else speak(job);
    }
  }
  function setRate(value) {
    rate = Math.max(0.7, Math.min(1.2, Number(value) || 0.9));
    if (active?.kind === 'audio') active.audio.playbackRate = rate;
    else if (active?.state === 'playing') {
      const job = active;
      job.token = ++serial;
      synthesis.cancel();
      speak(job);
    }
  }
  return { toggle, stop, setRate };
}
