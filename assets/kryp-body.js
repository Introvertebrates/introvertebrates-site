(() => {
  const explorer = document.querySelector('[data-body-explorer]');
  if (!explorer) return;
  const controls = [...explorer.querySelectorAll('[data-choose-part]')];
  const panels = [...explorer.querySelectorAll('.kk-body-panel')];
  const shapes = [...explorer.querySelectorAll('[data-body-part],[data-body-marker]')];
  const status = document.getElementById('body-selection-status');
  function select(part, announce = true) {
    const selected = panels.find(panel => panel.id === 'part-' + part);
    if (!selected) return;
    window.dispatchEvent(new Event('kk:stop-reading'));
    controls.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.choosePart === part)));
    panels.forEach(panel => { panel.hidden = panel !== selected; });
    shapes.forEach(shape => shape.classList.toggle('is-selected', (shape.dataset.bodyPart || shape.dataset.bodyMarker) === part));
    if (announce) status.textContent = 'Valgt: ' + selected.querySelector('h3').textContent;
  }
  controls.forEach(button => button.addEventListener('click', () => select(button.dataset.choosePart)));
  explorer.querySelector('.kk-part-options').hidden = false;
  select('forkropp', false);
})();
