(() => {
  const gallery = document.querySelector('[data-pet-photo-label]');
  const dialog = document.getElementById('pet-photo-dialog');
  if (!gallery || typeof dialog?.showModal !== 'function') return;

  const preview = dialog.querySelector('figure');
  const caption = preview.querySelector('figcaption');
  let opener;

  for (const figure of gallery.querySelectorAll('figure')) {
    const thumbnail = figure.querySelector('img');
    const name = figure.querySelector('figcaption').textContent.trim();
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'pet-photo-trigger';
    button.setAttribute('aria-label', gallery.dataset.petPhotoLabel.replace('{name}', name));
    button.setAttribute('aria-haspopup', 'dialog');
    thumbnail.before(button);
    button.append(thumbnail);

    button.addEventListener('click', () => {
      const photo = thumbnail.cloneNode();
      photo.loading = 'eager';
      caption.textContent = name;
      preview.replaceChildren(photo, caption);
      opener = button;
      dialog.showModal();
    });
  }

  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => {
    opener?.focus({ preventScroll: true });
  });
})();
