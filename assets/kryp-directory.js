(() => {
  const profiles = [...document.querySelectorAll('.kryp-profile')];
  const cards = [...document.querySelectorAll('.kryp-spotlight-card')];
  const back = document.querySelector('.kk-profile-back');
  const wildlife = new Set(['huggorm','oter','moskus','spettmeis','ravn','lappugle','sidensvans']);
  const tinaQuestions = {
    skorpion: 'Hvorfor kan vibrasjoner i bakken være viktigere enn godt syn om natten?',
    kakerlakker: 'Hva ville skjedd i skogen hvis ingenting spiste døde blader og tre?',
    kongesnok: 'Se på bildet. Hvorfor tror du kongesnoken stikker tungen ut?',
    teju: 'Hva kan tejuen gjøre med beina og øyelokkene som kongesnoken ikke kan?'
  };

  profiles.forEach(profile => {
    const question = tinaQuestions[profile.id];
    if (!question || profile.querySelector('[data-tina-profile]')) return;

    const card = document.createElement('div');
    card.className = 'kryp-weekly-question';
    card.dataset.tinaProfile = '';
    card.innerHTML = `<img src="/Tina%20%E2%80%93%20No%20background.png" alt="Tina Tarantell" width="82" height="82" loading="lazy"><p><strong>Tina spør:</strong> ${question}</p>`;

    const oldQuestion = profile.querySelector('.trail-question');
    if (oldQuestion) oldQuestion.replaceWith(card);
    else profile.querySelector('.kryp-profile-copy')?.append(card);
  });

  document.body.classList.add('js-profile-browser');
  function navigate() {
    const id = decodeURIComponent(location.hash.slice(1));
    const selected = profiles.find(p => p.id === id);
    profiles.forEach(p => {
      p.classList.toggle('is-active', p === selected);
      if (p !== selected) p.querySelectorAll('video').forEach(v => v.pause());
    });
    document.body.toggleAttribute('data-profile-open', Boolean(selected));
    back.hidden = !selected;
    if (selected) {
      document.querySelector('#profile-back').href = wildlife.has(id) ? '#norsk-natur' : '#samlingen';
      const heading = selected.querySelector('h2');
      heading.tabIndex = -1;
      heading.focus({preventScroll:true});
      window.scrollTo({top:0,behavior:'instant'});
    } else if (id) {
      document.getElementById(id)?.scrollIntoView({block:'start'});
    }
  }
  document.querySelector('#animal-search').addEventListener('input', event => {
    const query = event.target.value.trim().toLocaleLowerCase('nb');
    cards.forEach(card => { card.hidden = !card.textContent.toLocaleLowerCase('nb').includes(query); });
    document.querySelector('#animal-empty').hidden = cards.some(c => !c.hidden);
    document.querySelector('#animal-empty').setAttribute('role','status');
  });
  window.addEventListener('hashchange', navigate);
  navigate();

  const tinaGuide = document.createElement('script');
  tinaGuide.src = '/assets/tina-guide.js?v=20260911a';
  tinaGuide.defer = true;
  document.body.append(tinaGuide);
})();
