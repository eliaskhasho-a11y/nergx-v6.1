// MergX v8.39 – Navigation + AI-Nav + Modaler
document.addEventListener("DOMContentLoaded", () => {
  const sidebarItems = document.querySelectorAll(".sidebar li");
  const content = document.getElementById("content");
  const modalOverlay = document.getElementById("modalOverlay");
  const closeModal = document.getElementById("closeModal");

  // Ladda sidor
  async function loadPage(page) {
    try {
      const res = await fetch(`pages/${page}.html`);
      if (!res.ok) throw new Error();
      const html = await res.text();
      content.innerHTML = html;
      sidebarItems.forEach(li => li.classList.remove("active"));
      document.querySelector(`[data-page='${page}']`).classList.add("active");
    } catch {
      content.innerHTML = `<div class="card"><h3>Fel vid laddning</h3><p>pages/${page}.html 404</p></div>`;
    }
  }

  sidebarItems.forEach(item => item.addEventListener("click", () => loadPage(item.dataset.page)));

  // Tema
  document.getElementById("themeToggle").addEventListener("click", () => document.body.classList.toggle("light"));

  // Modaler
  document.addEventListener("click", e => {
    if (e.target.classList.contains("expandable")) {
      document.getElementById("modalTitle").textContent = e.target.dataset.title || "Expanderad modul";
      document.getElementById("modalContent").textContent = e.target.dataset.text || "Mer detaljer kommer här …";
      modalOverlay.classList.remove("hidden");
    }
  });
  closeModal.addEventListener("click", () => modalOverlay.classList.add("hidden"));

  // Start
  loadPage("overview");
});
