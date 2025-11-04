// MergX v8.53 – Dashboard (Chart.js-baserad vanilla JS-version)
// Visar KPI-kort, ekonomi-graf och overlay med AI-kommentarer.

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("dashboard-root");
  if (!root) return;

  // === Huvudlayout ===
  root.innerHTML = `
    <section class="dashboard">
      <h2 style="margin-bottom:1.5rem;">Översikt</h2>

      <div class="kpi-grid">
        <div class="kpi" data-key="omsättning">
          <h3>Omsättning (idag)</h3>
          <p class="value">125 000 kr</p>
          <span class="delta up">+6 %</span>
        </div>
        <div class="kpi" data-key="ordrar">
          <h3>Ordrar (idag)</h3>
          <p class="value">34</p>
          <span class="delta up">+2 %</span>
        </div>
        <div class="kpi" data-key="kostnader">
          <h3>Kostnader (idag)</h3>
          <p class="value">41 000 kr</p>
          <span class="delta down">−1,1 %</span>
        </div>
        <div class="kpi" data-key="marginal">
          <h3>Bruttomarginal</h3>
          <p class="value">41 %</p>
          <span class="delta up">+0,3 pp</span>
        </div>
      </div>

      <div class="chart-card">
        <h3>Ekonomi — kompositchart</h3>
        <canvas id="ecoChart" height="120"></canvas>
      </div>

      <div class="ai-card">
        <h3>AI-Analys</h3>
        <p>Försäljningen ökar 12 % i norra Stockholm.<br>Högst efterfrågan på USB-C 60 W.</p>
      </div>

      <div class="chat-card">
        <h3>Teamchatt</h3>
        <div class="chat-log">
          <p><span class="name anna">🟢 Anna:</span> God morgon teamet!</p>
          <p><span class="name jonas">👤 Jonas:</span> Jag tar kundmötet 11:00.</p>
        </div>
        <input id="chatInput" type="text" placeholder="Skriv ett meddelande..." />
      </div>

      <div id="overlay" class="overlay hidden">
        <div class="overlay-box">
          <button id="closeOverlay" class="close-btn">×</button>
          <h3 id="overlayTitle"></h3>
          <p id="overlayText"></p>
        </div>
      </div>
    </section>
  `;

  // === KPI interaktion ===
  const overlay = document.getElementById("overlay");
  const overlayTitle = document.getElementById("overlayTitle");
  const overlayText = document.getElementById("overlayText");

  document.querySelectorAll(".kpi").forEach((kpi) => {
    kpi.addEventListener("click", () => {
      const key = kpi.dataset.key;
      overlayTitle.textContent = kpi.querySelector("h3").textContent;
      overlayText.textContent =
        key === "omsättning"
          ? "AI: Omsättningen ökar stabilt. Fortsätt fokus på USB-C 60 W och kampanjer i norr."
          : key === "ordrar"
          ? "AI: Ordervolymen stiger. Optimera lagernivåer i norra regionen."
          : key === "kostnader"
          ? "AI: Kostnader minskar genom effektivare leverantörsavtal."
          : "AI: Marginal stabil. Håll fokus på premiumsegmentet.";
      overlay.classList.remove("hidden");
    });
  });

  document.getElementById("closeOverlay").onclick = () =>
    overlay.classList.add("hidden");

  // === Teamchatt (dummy) ===
  const chatInput = document.getElementById("chatInput");
  const chatLog = document.querySelector(".chat-log");
  chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && chatInput.value.trim() !== "") {
      const msg = document.createElement("p");
      msg.innerHTML = `<span class='name du'>💬 Du:</span> ${chatInput.value}`;
      chatLog.appendChild(msg);
      chatInput.value = "";
      chatLog.scrollTop = chatLog.scrollHeight;
    }
  });

  // === Ekonomi-graf (Chart.js) ===
  const ctx = document.getElementById("ecoChart").getContext("2d");
  new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Jan","Feb","Mar","Apr","Maj","Jun",
        "Jul","Aug","Sep","Okt","Nov","Dec"
      ],
      datasets: [
        {
          label: "Intäkter",
          data: [180, 220, 260, 210, 320, 300, 240, 280, 330, 360, 400, 420],
          borderColor: "#22c55e",
          tension: 0.4,
          fill: false,
        },
        {
          label: "Kostnader",
          data: [90, 120, 140, 130, 160, 170, 150, 155, 170, 190, 210, 220],
          borderColor: "#ef4444",
          tension: 0.4,
          fill: false,
        },
        {
          label: "Vinst",
          data: [90, 100, 120, 80, 160, 130, 90, 125, 160, 170, 190, 200],
          borderColor: "#06b6d4",
          tension: 0.4,
          fill: false,
        },
      ],
    },
    options: {
      plugins: {
        legend: { labels: { color: "#ddd" } },
      },
      scales: {
        x: { ticks: { color: "#bbb" }, grid: { color: "rgba(255,255,255,0.05)" } },
        y: { ticks: { color: "#bbb" }, grid: { color: "rgba(255,255,255,0.05)" } },
      },
    },
  });
});
// ... (din befintliga v8.53 Chart.js-kod) ...

// === PUBLIC API för shell ===
function renderDashboard(){
  // vänster huvudvy
  const view = `
    <section class="mx-card">
      <h2 style="margin:0 0 10px 0;">Översikt</h2>
      <div class="mx-kpi-grid">
        <div class="mx-kpi" data-k="oms">
          <div>Omsättning (idag)</div>
          <div class="value">125 000 kr</div>
          <div class="delta up">+6 %</div>
        </div>
        <div class="mx-kpi" data-k="ord">
          <div>Ordrar (idag)</div>
          <div class="value">34</div>
          <div class="delta up">+2 %</div>
        </div>
        <div class="mx-kpi" data-k="kos">
          <div>Kostnader (idag)</div>
          <div class="value">41 000 kr</div>
          <div class="delta down">−1,1 %</div>
        </div>
        <div class="mx-kpi" data-k="bm">
          <div>Bruttomarginal</div>
          <div class="value">41 %</div>
          <div class="delta up">+0,3 pp</div>
        </div>
      </div>

      <div class="mx-card" style="margin-top:12px;">
        <h3>Ekonomi — kompositchart</h3>
        <canvas id="ecoChart" height="120"></canvas>
      </div>

      <div id="kpi-expand-slot"></div>
    </section>
  `;

  // höger rail
  const rail = `
    <div class="mx-card">
      <h3>AI-Analys</h3>
      <p>Försäljningen ökar 12 % i norra Stockholm. Högst efterfrågan på USB-C 60 W.</p>
    </div>
    <div class="mx-card">
      <h3>AI-Karta (mini)</h3>
      <ul class="mx-list">
        <li><b>Elon Kista</b> — potentiell order om 20 dagar</li>
        <li><b>Mekonomen Solna</b> — befintlig kund</li>
        <li><b>Power Barkarby</b> — bra läge för demo</li>
      </ul>
    </div>
    <div class="mx-card">
      <h3>Åtgärder</h3>
      <ul class="mx-list">
        <li>Optimera inköp Q1 (låsa inköpspris)</li>
        <li>Kampanj B2B kablar (mål +12 % marginal)</li>
      </ul>
    </div>
  `;

  MX.setTitle("Dashboard");
  MX.mount(view, rail);

  // init chart igen nu när canvas finns
  const ctx = document.getElementById("ecoChart")?.getContext("2d");
  if (ctx) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Aug","Sep","Okt","Nov","Dec"],
        datasets: [
          { label:"Intäkter", data:[180,220,260,210,320,300,240,280,330,360,400,420], borderColor:"#22c55e", tension:.4, fill:false },
          { label:"Kostnader", data:[90,120,140,130,160,170,150,155,170,190,210,220], borderColor:"#ef4444", tension:.4, fill:false },
          { label:"Vinst", data:[90,100,120,80,160,130,90,125,160,170,190,200], borderColor:"#06b6d4", tension:.4, fill:false }
        ]
      },
      options:{ plugins:{ legend:{ labels:{ color:"#ddd"} } }, scales:{ x:{ ticks:{color:"#bbb"}, grid:{color:"rgba(255,255,255,.06)"}}, y:{ ticks:{color:"#bbb"}, grid:{color:"rgba(255,255,255,.06)"}} } }
    });
  }

  // KPI expand – lokal blur under panel (nedåt)
  const slot = document.getElementById("kpi-expand-slot");
  document.querySelectorAll(".mx-kpi").forEach(card=>{
    card.addEventListener("click", ()=>{
      slot.innerHTML = `
        <div class="mx-kpi-overlay">
          <div class="glass"></div>
          <div class="mx-kpi-panel">
            <button class="mx-close" id="kpiClose">Stäng</button>
            <h3 style="margin:0 0 8px 0;">${card.textContent.split('\n')[0].trim()} – detaljer</h3>
            <p>AI: lägesanalys och konkreta råd för vald KPI.</p>
          </div>
        </div>`;
      document.getElementById("kpiClose").onclick = ()=> slot.innerHTML = "";
    });
  });

  // reagera på datumfilter
  document.addEventListener("mx:range", (e)=> {
    console.log("Dashboard uppdatera range:", e.detail);
    // TODO: filtrera dataset beroende på MX.state.range
  }, { once:false });
}

// registrera route
MX.routes["dashboard"] = renderDashboard;
