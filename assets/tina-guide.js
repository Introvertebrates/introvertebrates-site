(() => {
  if (window.__tinaGuideLoaded) return;
  window.__tinaGuideLoaded = true;

  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = '/assets/tina-guide.css?v=20260911j';
  document.head.append(css);

  const roleImages = {
    sporr: '/assets/tina/tina-sporr.webp?v=20260911j',
    forklarer: '/assets/tina/tina-forklarer.webp?v=20260911j',
    utfordrer: '/assets/tina/tina-utfordrer.webp?v=20260911j',
    foreslar: '/assets/tina/tina-foreslar.webp?v=20260911j'
  };

  const avatar = (role, label = 'Tina Tarantell') =>
    `<img class="tina-avatar tina-avatar--${role}" src="${roleImages[role]}" alt="${label}" loading="lazy" decoding="async">`;

  const roles = [
    ['sporr', 'Tina spør', 'Et spørsmål som får deg til å se litt nærmere.'],
    ['forklarer', 'Tina forklarer', 'Et vanskelig ord eller en idé, forklart enkelt.'],
    ['utfordrer', 'Tina utfordrer', 'Et lite oppdrag: tell, sammenlign eller finn en detalj.'],
    ['foreslar', 'Tina foreslår', 'Et dyr, spor eller sted du kan utforske videre.']
  ];

  const roleGrid = () => `<div class="tina-role-grid">${roles.map(([role, title, copy]) => `
    <article class="tina-role-tile">
      ${avatar(role, title)}
      <div><strong>${title}</strong><p>${copy}</p></div>
    </article>`).join('')}</div>`;

  const roleCard = (role, title, body) => `<article class="tina-role-card" data-tina-role="${role}">
    ${avatar(role, title)}
    <div class="tina-role-content"><p class="tina-role-label">${title}</p>${body}</div>
  </article>`;

  const nextCard = (copy, href, linkText) => `<div class="tina-next">
    ${avatar('foreslar', 'Tina foreslår')}
    <p><strong>Tina foreslår</strong>${copy} <a href="${href}">${linkText} →</a></p>
  </div>`;

  const homeTina = document.querySelector('.kk-welcome .kk-tina');
  if (homeTina) {
    const oldImage = homeTina.querySelector('img');
    if (oldImage && !oldImage.classList.contains('tina-avatar')) {
      oldImage.replaceWith(document.createRange().createContextualFragment(avatar('sporr', 'Tina spør')));
    }
    const trails = document.querySelector('#spor');
    if (trails && !document.querySelector('.kk-tina-guide')) {
      const section = document.createElement('section');
      section.className = 'kk-section kk-wrap kk-tina-guide';
      section.setAttribute('aria-labelledby', 'tina-guide-title');
      section.innerHTML = `<div class="kk-section-head"><div><p class="kk-kicker">Tina viser vei</p><h2 id="tina-guide-title">Se hva Tina har å si.</h2></div><p>Hun spør, forklarer, utfordrer og foreslår hvor du kan gå videre.</p></div>${roleGrid()}`;
      trails.before(section);
    }
  }

  const tinaAbout = document.querySelector('#tina-tarantell .kryp-tina-copy');
  if (tinaAbout && !tinaAbout.querySelector('.kryp-tina-role-grid')) {
    const wrap = document.createElement('div');
    wrap.className = 'kryp-tina-role-grid';
    wrap.innerHTML = roleGrid();
    const actions = tinaAbout.querySelector('.kryp-actions');
    if (actions) actions.before(wrap); else tinaAbout.append(wrap);
  }

  const weeklyQuestion = document.querySelector('.kryp-weekly-question');
  if (weeklyQuestion) {
    const oldImage = weeklyQuestion.querySelector(':scope > img');
    if (oldImage && !oldImage.classList.contains('tina-avatar')) {
      oldImage.replaceWith(document.createRange().createContextualFragment(avatar('sporr', 'Tina spør')));
    }
  }

  const weeklyAside = document.querySelector('.kryp-weekly-aside');
  if (weeklyAside && !weeklyAside.querySelector('.tina-next')) {
    const renderedTrailLink = weeklyAside.querySelector('a[href]');
    if (renderedTrailLink) {
      const href = renderedTrailLink.getAttribute('href');
      const text = renderedTrailLink.textContent.replace(/→/g, '').trim() || 'Følg sporet';
      weeklyAside.insertAdjacentHTML('afterbegin', nextCard('Når du er ferdig med ukas dyr, kan du følge temaet videre.', href, text));
    }
  }

  const profileRoles = {
    huggorm: 'utfordrer', oter: 'sporr', moskus: 'utfordrer', spettmeis: 'utfordrer',
    ravn: 'utfordrer', lappugle: 'utfordrer', sidensvans: 'utfordrer', sabrina: 'utfordrer',
    ruby: 'utfordrer', sonja: 'sporr', siuzi: 'utfordrer', solbiller: 'utfordrer', knelere: 'utfordrer',
    skorpion: 'sporr', kakerlakker: 'sporr', kongesnok: 'sporr', teju: 'utfordrer'
  };
  const roleTitles = {sporr:'Tina spør', forklarer:'Tina forklarer', utfordrer:'Tina utfordrer', foreslar:'Tina foreslår'};

  document.querySelectorAll('.kryp-profile').forEach(profile => {
    const id = profile.id;
    const role = profileRoles[id] || 'sporr';

    profile.querySelectorAll('.kryp-tina-task').forEach(card => {
      if (card.dataset.tinaEnhanced) return;
      card.dataset.tinaEnhanced = 'true';
      card.dataset.tinaRole = role;
      card.classList.add('tina-role-card');

      const existingMarkup = card.innerHTML;
      card.innerHTML = `${avatar(role, roleTitles[role])}<div class="tina-role-content">${existingMarkup}</div>`;

      const label = card.querySelector('.kryp-tina-label');
      if (label) {
        label.textContent = roleTitles[role];
        label.className = 'tina-role-label';
      }
    });

    const dynamic = profile.querySelector('[data-tina-profile]');
    if (dynamic && !dynamic.dataset.tinaEnhanced) {
      dynamic.dataset.tinaEnhanced = 'true';
      dynamic.dataset.tinaRole = role;
      dynamic.classList.add('tina-role-card');
      dynamic.classList.remove('kryp-weekly-question');

      const p = dynamic.querySelector('p');
      const body = p ? p.innerHTML.replace(/<strong>.*?<\/strong>\s*/,'') : '';
      dynamic.innerHTML = `${avatar(role, roleTitles[role])}<div class="tina-role-content"><p class="tina-role-label">${roleTitles[role]}</p><p>${body}</p></div>`;
    }
  });

  const explainers = {
    kakerlakker: ['Hva er en nedbryter?', 'En nedbryter hjelper til med å bryte ned dødt materiale, slik at næringsstoffer kan brukes på nytt i naturen.'],
    solbiller: ['Hva betyr fullstendig forvandling?', 'Larve, puppe og voksen bille er ulike stadier av det samme dyret. Kroppen bygges kraftig om mellom stadiene.'],
    ruby: ['Hva betyr strukturell farge?', 'Fargen kommer ikke bare fra pigment. Små strukturer på kroppen påvirker hvordan lyset blir reflektert.']
  };
  Object.entries(explainers).forEach(([id, [title, text]]) => {
    const profile = document.getElementById(id);
    const facts = profile?.querySelector('.kryp-profile-facts');
    if (facts && !profile.querySelector('[data-tina-explainer]')) {
      facts.insertAdjacentHTML('beforeend', roleCard('forklarer', 'Tina forklarer', `<h3>${title}</h3><p>${text}</p>`).replace('<article ', '<article data-tina-explainer '));
    }
  });

  const nextStops = {
    huggorm: ['/kryp-spor-reptiler.html', 'Følg reptilsporet'],
    sonja: ['/kryp-spor-reptiler.html', 'Følg reptilsporet'],
    kongesnok: ['/kryp-artsprofiler.html#teju', 'Møt tejuen'],
    teju: ['/kryp-artsprofiler.html#sonja', 'Møt Sonja'],
    skorpion: ['/kryp-artsprofiler.html#sabrina', 'Møt Sabrina'],
    sabrina: ['/kryp-spor-krypenes-verden.html', 'Følg Krypenes verden'],
    ruby: ['/kryp-artsprofiler.html#sabrina', 'Møt Sabrina'],
    kakerlakker: ['/kryp-spor-krypenes-verden.html', 'Følg Krypenes verden'],
    ravn: ['/kryp-spor-hav-og-himmel.html', 'Følg sporet videre']
  };
  Object.entries(nextStops).forEach(([id, [href, text]]) => {
    const profile = document.getElementById(id);
    const copy = profile?.querySelector('.kryp-profile-copy');
    if (copy && !copy.querySelector('.tina-next')) copy.insertAdjacentHTML('beforeend', nextCard('Vil du utforske noe som henger sammen med dette dyret?', href, text));
  });

  const trailPage = document.querySelector('.kryp-trail-page');
  if (trailPage) {
    const path = location.pathname.split('/').pop();
    const trailNotes = {
      'kryp-spor-krypenes-verden.html': ['forklarer', 'To kroppsplaner', 'Insekter har seks bein. Edderkoppdyr har åtte. Det er en av de raskeste måtene å begynne å skille gruppene på.'],
      'kryp-spor-reptiler.html': ['forklarer', 'Varme utenfra', 'Reptiler bruker varme fra omgivelsene til å regulere kroppstemperaturen. Derfor betyr sol, skygge og skjul mye.'],
      'kryp-spor-norsk-villmark.html': ['utfordrer', 'Les landskapet', 'Se på bildene og finn én kroppsdel hos hvert dyr som passer spesielt godt til stedet det lever.'],
      'kryp-spor-hav-og-himmel.html': ['utfordrer', 'Se etter strategien', 'Finn én detalj som hjelper hvert dyr med å bevege seg, finne mat eller holde oversikt.']
    };
    const note = trailNotes[path];
    const firstIntro = trailPage.querySelector('.trail-intro');
    if (note && firstIntro && !trailPage.querySelector('[data-tina-trail-note]')) {
      const [role, title, text] = note;
      firstIntro.insertAdjacentHTML('beforeend', roleCard(role, roleTitles[role], `<h3>${title}</h3><p>${text}</p>`).replace('<article ', '<article data-tina-trail-note '));
    }
    const nextGrid = trailPage.querySelector('.trail-next-grid');
    if (nextGrid && !nextGrid.parentElement.querySelector('.tina-next')) {
      nextGrid.insertAdjacentHTML('beforebegin', nextCard('Ferdig med dette sporet? Velg et nytt og se hvilke forbindelser du finner.', '/kryp-og-krabater.html#spor', 'Se alle spor'));
    }
  }
})();
