<script>
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

          // After include, initialize page-specific scripts
          if (el.id === "authors-section") {
            initAuthorsPage();
          }
        })
        .catch(error => {
          console.error('Include error:', error);
          el.innerHTML = `<div style="color:red;">Error loading ${file}</div>`;
        });
    }
  });
}

function initAuthorsPage() {
  const searchInput = document.getElementById("author-search");
  const authorCards = document.querySelectorAll(".author-card");

  if (searchInput && authorCards.length > 0) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();

      authorCards.forEach(card => {
        const name = card.querySelector(".author-name").textContent.toLowerCase();
        const role = card.querySelector(".author-role").textContent.toLowerCase();
        const matches = name.includes(query) || role.includes(query);

        card.style.display = matches ? "block" : "none";
      });
    });
  }

  const toggleButtons = document.querySelectorAll(".toggle-bio");
  toggleButtons.forEach(button => {
    button.addEventListener("click", function () {
      const bio = this.closest(".author-card").querySelector(".author-bio");
      bio.style.display = bio.style.display === "none" ? "block" : "none";
    });
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);
</script>
