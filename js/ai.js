/*  MergX v8.33 – AI Core Simulation */
/*  Förberedelse för riktig LLM-integration  */

async function loadMockData() {
  const res = await fetch("./data/mock.json");
  const data = await res.json();
  populateDashboard(data);
}

function populateDashboard(data) {
  const kpiContainer = document.querySelector("#kpiContainer");
  if (!kpiContainer) return;

  kpiContainer.innerHTML = `
    <div class="kpi__card card" data-title="Omsättning">
      <div class="kpi__value">${data.kpi.omsättning.toLocaleString()} SEK</div>
      <div class="kpi__bar"><span style="width:${(data.kpi.omsättning / data.kpi.budget) * 100}%"></span></div>
    </div>
    <div class="kpi__card card" data-title="Kostnader">
      <div class="kpi__value">${data.kpi.kostnader.toLocaleString()} SEK</div>
      <div class="kpi__bar"><span style="width:${(data.kpi.kostnader / data.kpi.budget) * 100}%"></span></div>
    </div>
    <div class="kpi__card card" data-title="Vinst">
      <div class="kpi__value">${data.kpi.vinst.toLocaleString()} SEK</div>
      <div class="kpi__bar"><span style="width:${(data.kpi.vinst / data.kpi.budget) * 100}%"></span></div>
    </div>
  `;
}

/* Mock AI-analys per modul */
function aiModuleAnalysis(module) {
  const analyses = {
    ekonomi: "AI-analys: Omsättningen är stark, kostnader stabila. Föreslår justering av lagerbudget med +7 %.",
    kund: "AI-analys: Kundnöjdheten ökade med 11 %. Föreslår att följa upp med Mekonomen inom 7 dagar.",
    lager: "AI-analys: Lagerbalans bra, men 10 artiklar närmar sig slut. AI kan automatisera beställningar.",
    karta: "AI-rutt: 3 potentiella kunder inom 15 km. Föreslår besök i Täby, Bromma och Sundbyberg."
  };
  return analyses[module] || "AI-analys saknas för denna modul.";
}

/* Initiering */
loadMockData();
window.aiModuleAnalysis = aiModuleAnalysis;
