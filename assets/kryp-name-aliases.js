(() => {
  // Keep existing bookmarks working after the Norwegian name correction.
  const legacyFragments = {
    '#solbiller': '#rosenbiller',
    '#colouring-solbille': '#colouring-rosenbille',
    '#sheet-solbille': '#sheet-rosenbille'
  };
  const canonicalize = () => {
    const canonical = legacyFragments[window.location.hash];
    if (!canonical) return;
    window.history.replaceState(window.history.state, '', canonical);
    document.getElementById(canonical.slice(1))?.scrollIntoView({block: 'start'});
  };
  window.addEventListener('hashchange', canonicalize);
  canonicalize();
})();
