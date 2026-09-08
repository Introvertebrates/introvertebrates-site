(() => {
  const profiles = [...document.querySelectorAll('.kryp-profile')];
  const cards = [...document.querySelectorAll('.kryp-spotlight-card')];
  const back = document.querySelector('.kk-profile-back');
  const wildlife = new Set(['huggorm','oter','moskus','spettmeis','ravn','lappugle','sidensvans']);
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
})();
