// MergX v8.53 – Dashboard (vanilla JS-version)
// Skapar dynamisk dashboard med KPI-kort och ekonomi-graf (Chart.js)
document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("dashboard-root");
  if (!root) return;

  root.innerHTML = `
    <section class="dashboard">
      <h2>MergX Dashboard v8.53</h2>
      <div class="kpi-grid">
        <div class="kpi" data-key="intakter">
          <h3>Intäkter</h3>
          <p class="value">765 400 kr</p>
          <span class="delta up">+12,3 %</span>
        </div>
        <div class="kpi" data-key="kostnader">
          <h3>Kostnader</h3>
          <p class="value">542 300 kr</p>
          <span class="delta down">-3,2 %</span>
        </div>
        <div class="kpi" data-key="vinst">
          <h3>Vinst</h3>
          <p class="value">223 100 kr</p>
          <span class="delta up">+6,7 %</span>
        </div>
      </div>

      <canvas id="ecoChart" height="120"></canvas>

      <div id="kpi-overlay" class="overlay hidden">
        <div class="overlay-content">
          <button id="closeOverlay">×</button>
          <h3 id="overlayTitle"></h3>
          <p id="overlayText"></p>
        </div>
      </div>
    </section>
  `;

  // === KPI-kort interaktion ===
  const overlay = document.getElementById("kpi-overlay");
  const title = document.getElementById("overlayTitle");
  const text = document.getElementById("overlayText");
  document.querySelectorAll(".kpi").forEach((el) => {
    el.addEventListener("click", () => {
      title.textContent = el.querySelector("h3").textContent;
      text.textContent = "AI-analys och detaljerad data för " + el.dataset.key;
      overlay.classList.remove("hidden");
    });
  });
  document.getElementById("closeOverlay").onclick = () =>
    overlay.classList.add("hidden");

  // === Ekonomi-graf (Chart.js) ===
  const ctx = document.getElementById("ecoChart").getContext("2d");
  const chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Maj",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Intäkter",
          data: [180, 220, 260, 210, 320, 300, 240, 280, 330, 360, 400, 420],
          borderColor: "#22c55e",
          fill: false,
        },
        {
          label: "Kostnader",
          data: [90, 120, 140, 130, 160, 170, 150, 155, 170, 190, 210, 220],
          borderColor: "#ef4444",
          fill: false,
        },
        {
          label: "Vinst",
          data: [90, 100, 120, 80, 160, 130, 90, 125, 160, 170, 190, 200],
          borderColor: "#06b6d4",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { position: "bottom" } },
    },
  });
});
