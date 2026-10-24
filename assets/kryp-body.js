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
    shapes.forEach(shape => {
      const active = (shape.dataset.bodyPart || shape.dataset.bodyMarker) === part;
      shape.classList.toggle('is-selected', active);
      if (shape.hasAttribute('data-body-part')) shape.setAttribute('aria-pressed', String(active));
    });
    if (announce) status.textContent = 'Valgt: ' + selected.querySelector('h3').textContent;
  }
  // Make the anatomical regions themselves selectable, not just the numbered buttons.
  const partNames = {
    forkropp: 'Forkropp', bakkropp: 'Bakkropp', bein: 'Gangbein',
    oyne: 'Øyne', munndeler: 'Munndeler', pedipalper: 'Pedipalper',
    spinnvorter: 'Spinnvorter'
  };
  const svgNS = 'http://www.w3.org/2000/svg';

  // Small features and narrow legs need larger, invisible hit areas on touchscreens.
  ['bein', 'pedipalper'].forEach(part => {
    const group = explorer.querySelector('[data-body-part="' + part + '"]');
    if (!group) return;
    [...group.querySelectorAll('path')].forEach(path => {
      const hit = document.createElementNS(svgNS, 'path');
      hit.setAttribute('d', path.getAttribute('d'));
      hit.setAttribute('class', 'kk-map-tap-line');
      group.appendChild(hit);
    });
  });

  [
    ['oyne', 239, 151, 43, 29],
    ['munndeler', 238, 130, 44, 30],
    ['spinnvorter', 229, 415, 63, 43]
  ].forEach(([part, x, y, width, height]) => {
    const group = explorer.querySelector('[data-body-part="' + part + '"]');
    if (!group) return;
    const hit = document.createElementNS(svgNS, 'rect');
    Object.entries({ x, y, width, height }).forEach(([key, value]) => hit.setAttribute(key, String(value)));
    hit.setAttribute('class', 'kk-map-tap-box');
    group.appendChild(hit);
  });

  // Keep the visible numbered markers the same size, while increasing their tap targets.
  explorer.querySelectorAll('[data-body-marker]').forEach(marker => {
    const circle = marker.querySelector('circle');
    if (!circle) return;
    const hit = document.createElementNS(svgNS, 'circle');
    hit.setAttribute('cx', circle.getAttribute('cx'));
    hit.setAttribute('cy', circle.getAttribute('cy'));
    hit.setAttribute('r', '23');
    hit.setAttribute('class', 'kk-map-tap-circle');
    marker.insertBefore(hit, circle);
  });

  shapes.forEach(shape => {
    const part = shape.dataset.bodyPart || shape.dataset.bodyMarker;
    if (!partNames[part]) return;
    shape.addEventListener('click', () => select(part));
    if (shape.hasAttribute('data-body-part')) {
      shape.setAttribute('role', 'button');
      shape.setAttribute('tabindex', '0');
      shape.setAttribute('aria-label', 'Velg ' + partNames[part].toLowerCase());
      shape.setAttribute('aria-pressed', 'false');
      shape.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          select(part);
        }
      });
    } else {
      // The same parts are keyboard-accessible through the shapes and button list.
      shape.setAttribute('aria-hidden', 'true');
    }
  });

  controls.forEach(button => button.addEventListener('click', () => select(button.dataset.choosePart)));
  explorer.querySelector('.kk-part-options').hidden = false;
  select('forkropp', false);
})();
