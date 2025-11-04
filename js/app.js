document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const modal = document.getElementById("modal");
  const closeModal = document.querySelector(".close-modal");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      updateDashboard(btn.dataset.period);
    });
  });

  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => openModal(card));
  });

  closeModal.addEventListener("click", () => modal.classList.add("hidden"));

  function openModal(card) {
    const modalTitle = document.getElementById("modal-title");
    modalTitle.textContent = card.querySelector("h3").textContent + " — Detaljer";
    modal.classList.remove("hidden");
  }

  function updateDashboard(period) {
    fetch("./data/mock.json")
      .then(res => res.json())
      .then(data => {
        const d = data[period];
        document.getElementById("omsattning").textContent = d.omsattning;
        document.getElementById("ordrar").textContent = d.ordrar;
        document.getElementById("kostnader").textContent = d.kostnader;
        document.getElementById("marginal").textContent = d.marginal;
        document.getElementById("ai-analys").textContent = d.aiAnalys;
      });
  }

  updateDashboard("day");
});
