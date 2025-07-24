function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');

  elements.forEach(el => {
    const file = el.getAttribute('data-include');
    if (file) {
      fetch(file)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch ${file}: ${response.statusText}`);
          }
          return response.text();
        })
        .then(data => {
          el.innerHTML = data;
        })
        .catch(error => {
          console.error('Include error:', error);
          el.innerHTML = `<div style="color:red;">Error loading ${file}</div>`;
        });
    }
  });
}

// Load includes after DOM is ready
document.addEventListener('DOMContentLoaded', includeHTML);
