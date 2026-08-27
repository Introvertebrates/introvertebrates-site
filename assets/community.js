(function () {
  'use strict';

  var recordRoots = Array.prototype.slice.call(document.querySelectorAll('[data-community-records]'));
  var spotlightRoots = Array.prototype.slice.call(document.querySelectorAll('[data-community-spotlights]'));

  if (recordRoots.length === 0 && spotlightRoots.length === 0) return;

  var dataUrl = 'assets/data/community-records.json';

  function makeElement(tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) element.className = className;
    if (typeof text === 'string') element.textContent = text;
    return element;
  }

  function safeLimit(root, fallback) {
    var requested = Number.parseInt(root.getAttribute('data-community-limit') || '', 10);
    return Number.isFinite(requested) && requested > 0 ? requested : fallback;
  }

  function setEmpty(root, title, copy) {
    var homepageSection = root.closest('.homepage-community');
    if (homepageSection) homepageSection.classList.add('is-empty');
    root.replaceChildren();
    var card = makeElement('article', 'community-empty');
    card.append(makeElement('span', 'community-empty-mark', 'Open for submissions'));
    card.append(makeElement('h3', '', title));
    card.append(makeElement('p', '', copy));
    root.append(card);
  }

  function appendCredit(parent, item) {
    if (!item.creditName) return;
    var credit = makeElement('p', 'community-credit');
    credit.append(document.createTextNode('Photo: '));
    if (item.creditUrl && /^https:\/\//.test(item.creditUrl)) {
      var link = makeElement('a', '', item.creditName);
      link.href = item.creditUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      credit.append(link);
    } else {
      credit.append(document.createTextNode(item.creditName));
    }
    parent.append(credit);
  }

  function renderRecord(root, item) {
    var card = makeElement('article', 'community-record-card');
    if (item.photo && /^assets\//.test(item.photo)) {
      var image = document.createElement('img');
      image.src = item.photo;
      image.alt = item.photoAlt || '';
      image.loading = 'lazy';
      image.decoding = 'async';
      card.append(image);
    }

    var body = makeElement('div', 'community-record-body');
    body.append(makeElement('p', 'community-record-label', item.label || item.category || 'Community record'));
    body.append(makeElement('p', 'community-record-value', [item.value, item.unit].filter(Boolean).join(' ')));
    body.append(makeElement('h3', '', item.displayName || item.scientificName || 'Keeper-submitted animal'));
    if (item.scientificName && item.displayName) body.append(makeElement('p', 'community-scientific', item.scientificName));
    if (item.evidenceLevel) body.append(makeElement('span', 'community-review-badge', item.evidenceLevel));
    if (item.notes) body.append(makeElement('p', 'community-record-note', item.notes));
    appendCredit(body, item);
    card.append(body);
    root.append(card);
  }

  function renderSpotlight(root, item) {
    var card = makeElement('article', 'community-spotlight-card');
    if (item.photo && /^assets\//.test(item.photo)) {
      var image = document.createElement('img');
      image.src = item.photo;
      image.alt = item.photoAlt || '';
      image.loading = 'lazy';
      image.decoding = 'async';
      card.append(image);
    }
    var body = makeElement('div', 'community-spotlight-body');
    body.append(makeElement('p', 'community-record-label', 'Community spotlight'));
    body.append(makeElement('h3', '', item.title || item.scientificName || 'Keeper-submitted animal'));
    if (item.scientificName && item.title) body.append(makeElement('p', 'community-scientific', item.scientificName));
    if (item.story) body.append(makeElement('p', '', item.story));
    appendCredit(body, item);
    card.append(body);
    root.append(card);
  }

  function render(data) {
    var records = Array.isArray(data.records) ? data.records : [];
    var spotlights = Array.isArray(data.spotlights) ? data.spotlights : [];

    recordRoots.forEach(function (root) {
      if (records.length === 0) {
        setEmpty(root, 'No titleholder yet.', 'The first reviewed measurements will appear here. Every published result will show how it was checked.');
        return;
      }
      var homepageSection = root.closest('.homepage-community');
      if (homepageSection) homepageSection.classList.remove('is-empty');
      root.replaceChildren();
      records.slice(0, safeLimit(root, records.length)).forEach(function (item) {
        renderRecord(root, item);
      });
    });

    spotlightRoots.forEach(function (root) {
      if (spotlights.length === 0) {
        setEmpty(root, 'Your animal could be the first spotlight.', 'Submit a photograph and a short story for consideration. Records are not required.');
        return;
      }
      root.replaceChildren();
      spotlights.slice(0, safeLimit(root, spotlights.length)).forEach(function (item) {
        renderSpotlight(root, item);
      });
    });

    document.querySelectorAll('[data-community-updated]').forEach(function (element) {
      element.textContent = data.updatedAt ? 'Last reviewed ' + data.updatedAt : 'Submissions are now open';
    });
  }

  fetch(dataUrl, { cache: 'no-cache' })
    .then(function (response) {
      if (!response.ok) throw new Error('Community data could not be loaded.');
      return response.json();
    })
    .then(render)
    .catch(function () {
      recordRoots.forEach(function (root) {
        setEmpty(root, 'Records are temporarily unavailable.', 'Please try again later or contact Introvertebrates to submit a record.');
      });
      spotlightRoots.forEach(function (root) {
        setEmpty(root, 'Spotlights are temporarily unavailable.', 'Please try again later or contact Introvertebrates to share a photograph.');
      });
    });
}());
