// MergX v8.38 • Core – Routing + Interaktivitet
document.addEventListener("DOMContentLoaded", () => {
  const sidebarItems = document.querySelectorAll(".sidebar li");
  const content = document.getElementById("content");

  async function loadPage(page) {
    try {
      const res = await fetch(`pages/${page}.html`);
      if (!res.ok) throw new Error(`${page} not found`);
      const html = await res.text();
      content.innerHTML = html;
      sidebarItems.forEach(li => li.classList.remove("active"));
      document.querySelector(`[data-page="${page}"]`).classList.add("active");
    } catch (err) {
      content.innerHTML = `
        <div class="card">
          <h3>Fel vid laddning</h3>
          <p>pages/${page}.html 404</p>
        </div>`;
    }
  }

  // Navigering
  sidebarItems.forEach(item => {
    item.addEventListener("click", () => loadPage(item.dataset.page));
  });

  // Tema-växling
  document.getElementById("themeToggle").addEventListener("click", () => {
    document.body.classList.toggle("light");
  });

  // Start-vy
  loadPage("overview");
});
