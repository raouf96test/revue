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
document.addEventListener("DOMContentLoaded", function () {
  // Load Header
  fetch("partials/header.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("site-header").innerHTML = data;
    });

  // Load Footer
  fetch("partials/footer.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("site-footer").innerHTML = data;
    });

  // Optional: Load Sidebar if you want it on this page
  fetch("partials/sidebar.html")
    .then(response => response.text())
    .then(data => {
      const sidebarContainer = document.createElement("div");
      sidebarContainer.className = "journal-sidebar";
      sidebarContainer.innerHTML = data;
      document.body.insertBefore(sidebarContainer, document.querySelector("main"));
    });
});
