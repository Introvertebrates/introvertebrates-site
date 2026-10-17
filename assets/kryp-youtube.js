(() => {
  const targets = [...document.querySelectorAll('[data-kryp-videos]')];
  const profile = document.body.dataset.profile;
  // Species pages already share species.js. Do not create empty media sections.
  const speciesMain = profile && document.querySelector('main');
  if (!targets.length && !speciesMain) return;
  const english = document.documentElement.lang === 'en';
  const node = (tag, text, className) => {
    const el = document.createElement(tag);
    if (text) el.textContent = text;
    if (className) el.className = className;
    return el;
  };
  const link = (text, href) => {
    const el = node('a', text);
    el.href = href;
    return el;
  };
  function card(item) {
    const article = node('article', '', 'kk-video-card');
    const watch = link('', `https://www.youtube.com/watch?v=${item.id}`);
    watch.setAttribute('aria-label', item.title);
    const image = node('img');
    image.src = `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;
    image.alt = '';
    image.width = 480; image.height = 360; image.loading = 'lazy';
    watch.append(image);
    const copy = node('div', '', 'kk-video-copy');
    const date = node('time', new Date(item.published).toLocaleDateString(english ? 'en-GB' : 'nb-NO', { timeZone: 'Europe/Oslo', year: 'numeric', month: 'long', day: 'numeric' }));
    date.dateTime = item.published;
    const heading = node('h3');
    if (english) heading.lang = 'no';
    heading.append(link(item.title, watch.href));
    copy.append(date, heading);
    if (item.summary) {
      const summary = node('p', item.summary);
      if (english) summary.lang = 'no';
      copy.append(summary);
    }
    copy.append(link(english ? 'Watch in Norwegian on YouTube ↗' : 'Se på YouTube ↗', watch.href));
    for (const key of item.profiles || []) {
      copy.append(link(english ? 'Explore the animal profile →' : 'Utforsk dyreprofilen (engelsk) →', `/species/${key}.html`));
    }
    article.append(watch, copy);
    return article;
  }
  fetch('/assets/data/kryp-youtube.json', { cache: 'no-cache' })
    .then(response => {
      if (!response.ok) throw new Error('Public video list unavailable');
      return response.json();
    })
    .then(data => {
      const items = (data.items || []).filter(item => /^[A-Za-z0-9_-]{11}$/.test(item.id) && new Date(item.published) <= new Date());
      if (speciesMain) {
        const related = items.filter(item => item.profiles?.includes(profile));
        if (related.length) {
          const section = node('section', '', 'kk-video-section species-shell');
          section.append(node('h2', 'Kryp & Krabater · Norwegian videos'));
          const grid = node('div', '', 'kk-video-grid');
          grid.append(...related.map(card)); section.append(grid); speciesMain.append(section);
        }
      }
      for (const target of targets) {
        const key = target.dataset.krypProfile;
        const related = key ? items.filter(item => item.norwegianProfiles?.includes(key)) : items;
        const selected = related.slice(0, Number(target.dataset.limit) || related.length);
        if (!selected.length) continue;
        const grid = node('div', '', 'kk-video-grid');
        grid.append(...selected.map(card)); target.append(grid); target.hidden = false;
      }
    })
    .catch(() => { /* Existing channel links remain available if the list cannot load. */ });
})();
