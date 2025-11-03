/* =====================================================
   MergX v8.35 • Base-Core Master Logic
   ===================================================== */
document.addEventListener("DOMContentLoaded", () => {
  console.log("MergX v8.35 Core loaded ✅");

  // === ELEMENTER ===
  const kpiSales = document.getElementById("kpi-sales");
  const kpiOrders = document.getElementById("kpi-orders");
  const kpiCosts = document.getElementById("kpi-costs");
  const aiSummary = document.getElementById("ai-summary-text");
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");
  const chatMessages = document.getElementById("chatMessages");
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const closeModalBtn = document.querySelector(".close-modal");

  /* === SLUMPAD DEMO-DATA === */
  function randomVal(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const kpis = {
    sales: randomVal(18000, 22000),
    orders: randomVal(60, 100),
    costs: randomVal(7000, 9000),
  };

  kpiSales.textContent = `${kpis.sales.toLocaleString()} kr`;
  kpiOrders.textContent = kpis.orders;
  kpiCosts.textContent = `${kpis.costs.toLocaleString()} kr`;

  // === TREND VISUAL (enkla pilar) ===
  ["sales", "orders", "costs"].forEach((key) => {
    const el = document.getElementById(`trend-${key}`);
    const diff = randomVal(-5, 15);
    el.textContent = diff > 0 ? `▲ ${diff}%` : `▼ ${Math.abs(diff)}%`;
    el.style.color = diff > 0 ? "#4ade80" : "#f87171";
  });

  /* === AI-SAMMANFATTNING (mock) === */
  setTimeout(() => {
    aiSummary.textContent =
      "AI-analysen visar stabil tillväxt. Kostnaderna hålls inom ramen, men försäljningen kan ökas med riktade kampanjer i Stockholm-regionen.";
  }, 1000);

  /* === MODAL-SYSTEM === */
  const kpiCards = document.querySelectorAll(".kpi-card");
  kpiCards.forEach((card) => {
    card.addEventListener("click", () => {
      const type = card.dataset.type;
      openModal(type);
    });
  });

  function openModal(type) {
    modal.classList.remove("hidden");
    modalBody.innerHTML = `
      <h2>${type.toUpperCase()}-detaljer</h2>
      <canvas id="chart-${type}" height="200"></canvas>
      <p class="ai-note">AI-analys: ${type === "sales"
        ? "försäljningen ökar i centrala butiker"
        : type === "orders"
        ? "orderflödet stabilt, måndag topp"
        : "kostnader oförändrade, fokus logistik"
      }.</p>
    `;
  }
  closeModalBtn.addEventListener("click", () =>
    modal.classList.add("hidden")
  );
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  /* === TEAM-CHATT === */
  function addMessage(text, sender = "user") {
    const msg = document.createElement("div");
    msg.classList.add("msg", sender);
    msg.textContent = text;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function aiReply(userText) {
    const lower = userText.toLowerCase();
    let reply = "Intressant, berätta mer.";
    if (lower.includes("hej")) reply = "Hej! Hur kan jag hjälpa dig idag?";
    else if (lower.includes("budget"))
      reply = "Budgeten ser bra ut, men håll koll på Q4-kostnader.";
    else if (lower.includes("tack")) reply = "Alltid ett nöje 😊";
    setTimeout(() => addMessage(reply, "system"), 600);
  }

  chatSend.addEventListener("click", () => {
    const val = chatInput.value.trim();
    if (!val) return;
    addMessage(val, "user");
    aiReply(val);
    chatInput.value = "";
  });

  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      chatSend.click();
    }
  });

  /* === MAP MOCK === */
  const mapArea = document.getElementById("mapArea");
  if (mapArea) {
    setTimeout(() => {
      mapArea.textContent = "Butiker i närheten identifierade (mock-data)";
    }, 1500);
  }

  /* === TEMA-OCH-SPRÅKTOGGLING (mock) === */
  const themeToggle = document.getElementById("themeToggle");
  const langToggle = document.getElementById("langToggle");

  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    themeToggle.textContent = isLight ? "🌙 Mörkt" : "☀️ Ljust";
  });

  langToggle?.addEventListener("click", () => {
    const current = langToggle.dataset.lang || "sv";
    const next = current === "sv" ? "en" : "sv";
    langToggle.dataset.lang = next;
    langToggle.textContent = next === "sv" ? "🌐 Svenska" : "🌐 English";
    alert(`Språk växlat till ${next === "sv" ? "svenska" : "engelska"}.`);
  });
});
