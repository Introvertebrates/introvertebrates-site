(() => {
  const sheetButtons = [...document.querySelectorAll("[data-print-sheet]")];

  if (!sheetButtons.length) return;

  const available = new Set(sheetButtons.map(button => button.dataset.printSheet));
  document.querySelectorAll('.colouring-sheet').forEach(sheet => {
    sheet.toggleAttribute('data-unavailable-sheet', !available.has(sheet.id));
  });

  const resetPrintTarget = () => {
    document.body.removeAttribute("data-print-sheet");
    document.querySelectorAll(".colouring-sheet.is-print-target").forEach((sheet) => {
      sheet.classList.remove("is-print-target");
    });
  };

  sheetButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      resetPrintTarget();
      const sheetId = button.dataset.printSheet;
      const sheet = sheetId ? document.getElementById(sheetId) : null;
      if (!sheet) return;

      button.disabled = true;
      button.setAttribute('aria-busy', 'true');
      button.parentElement.querySelector('[data-print-error]')?.remove();
      try {
        // Hidden print images may not have decoded yet on a slow connection.
        await Promise.all([...sheet.querySelectorAll('img')].map(image => image.decode()));
        if (document.fonts) await document.fonts.ready;
        document.body.dataset.printSheet = sheetId;
        sheet.classList.add("is-print-target");
        window.print();
      } catch {
        resetPrintTarget();
        const message = document.createElement('p');
        message.dataset.printError = '';
        message.setAttribute('role', 'alert');
        message.textContent = 'Arket kunne ikke lastes helt inn. Sjekk nettforbindelsen og prøv igjen.';
        button.parentElement.append(message);
      } finally {
        button.disabled = false;
        button.removeAttribute('aria-busy');
      }
    });
  });

  window.addEventListener("afterprint", resetPrintTarget);
})();
