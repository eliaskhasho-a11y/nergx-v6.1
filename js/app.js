// MergX v8.48 – Interaktiv Dashboard + AI
let data;

async function loadData() {
  const res = await fetch("./data/mock.json");
  data = await res.json();
  updateDashboard();
}

function updateDashboard() {
  document.getElementById("revenue").textContent = data.revenue.value;
  document.getElementById("revenueChange").textContent = data.revenue.change;
  document.getElementById("orders").textContent = data.orders.value;
  document.getElementById("ordersChange").textContent = data.orders.change;
  document.getElementById("costs").textContent = data.costs.value;
  document.getElementById("costsChange").textContent = data.costs.change;
  document.getElementById("margin").textContent = data.margin.value;
  document.getElementById("marginChange").textContent = data.margin.change;
  document.getElementById("aiAnalysis").textContent = data.analysis;
  renderLists();
}

function renderLists() {
  const aiMapList = document.getElementById("aiMapList");
  aiMapList.innerHTML = "";
  data.aiMap.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.location} — ${item.note}`;
    aiMapList.appendChild(li);
  });

  ["aiSuggestions", "aiNotes", "aiLeads"].forEach((id, i) => {
    const el = document.getElementById(id);
    el.innerHTML = "";
    const arr = data[["suggestions", "notes", "leads"][i]];
    arr.forEach((x) => {
      const li = document.createElement("li");
      li.textContent = x;
      el.appendChild(li);
    });
  });
}

// Chart.js ekonomi-graf
let chart;
function renderChart() {
  const ctx = document.getElementById("chartCanvas");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Mån", "Tis", "Ons", "Tor", "Fre"],
      datasets: [
        {
          label: "Omsättning",
          data: [120, 150, 180, 200, 240],
          borderColor: "#00ffffaa",
          backgroundColor: "rgba(0,255,255,0.2)",
          fill: true,
        },
        {
          label: "Kostnader",
          data: [80, 90, 100, 110, 115],
          borderColor: "#ff0077aa",
          backgroundColor: "rgba(255,0,119,0.15)",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { labels: { color: "#fff" } } },
      scales: {
        x: { ticks: { color: "#ccc" } },
        y: { ticks: { color: "#ccc" } },
      },
    },
  });
}

// Interaktiva KPI-kort
document.querySelectorAll(".stat-card").forEach((card) => {
  card.addEventListener("click", () => {
    const type = card.dataset.type;
    openModal(type);
  });
});

// Expanderad modal
function openModal(type) {
  const modal = document.getElementById("expandModal");
  const title = document.getElementById("modalTitle");
  const details = document.getElementById("modalDetails");
  const aiModal = document.getElementById("aiModalAnalysis");

  title.textContent = type.toUpperCase();
  details.textContent = `Detaljerad data för ${type} senaste veckan: ${data[type].details || "Inga detaljer ännu"}`;
  aiModal.textContent = data[type].ai || "AI-analys kommer snart.";
  modal.classList.remove("hidden");
}

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("expandModal").classList.add("hidden");
});

// Teamchat
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = chatInput.value.trim();
  if (!msg) return;
  const div = document.createElement("div");
  div.className = "chat-message";
  div.innerHTML = `<strong>Du:</strong> ${msg}`;
  chatMessages.appendChild(div);
  chatInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Auto-update varje 60 sekunder
setInterval(() => {
  if (data) {
    data.revenue.value = (parseInt(data.revenue.value.replace(/\D/g, "")) + Math.floor(Math.random() * 1000)) + " kr";
    updateDashboard();
  }
}, 60000);

loadData();
renderChart();
