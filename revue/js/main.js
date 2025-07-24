document.addEventListener("DOMContentLoaded", () => {
  const includes = document.querySelectorAll("[data-include]");
  includes.forEach(async el => {
    const file = el.dataset.include;
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      el.innerHTML = await response.text();
    } catch (err) {
      console.error(`Erreur chargement ${file}:`, err);
    }
  });
});
