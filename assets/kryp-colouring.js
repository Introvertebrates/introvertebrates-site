(() => {
  const sheetButtons = [...document.querySelectorAll("[data-print-sheet]")];

  if (!sheetButtons.length) return;

  const resetPrintTarget = () => {
    document.body.removeAttribute("data-print-sheet");
    document.querySelectorAll(".colouring-sheet.is-print-target").forEach((sheet) => {
      sheet.classList.remove("is-print-target");
    });
  };

  sheetButtons.forEach((button) => {
    button.addEventListener("click", () => {
      resetPrintTarget();
      const sheetId = button.dataset.printSheet;
      const sheet = sheetId ? document.getElementById(sheetId) : null;
      if (!sheet) return;

      document.body.dataset.printSheet = sheetId;
      sheet.classList.add("is-print-target");
      window.setTimeout(() => window.print(), 50);
    });
  });

  window.addEventListener("afterprint", resetPrintTarget);
})();
