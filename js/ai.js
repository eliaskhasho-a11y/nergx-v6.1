/* =========================================================
   MergX v8.36 • ai.js
   AI-panel, AI-karta (mock) & smarta analyser
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  console.log("🤖 MergX AI-modul initierad");

  const $ = (sel, ctx = document) => ctx.querySelector(sel);

  /* ---------- AI-NOTISER & FÖRSLAG ---------- */
  const aiSuggestions = $("#ai-suggestions");
  const aiNotifications = $("#ai-notifications");
  const aiTotal = $("#ai-total-analysis");

  const suggestions = [
    "Planera nästa kundbesök hos Elon Kista (20 dagar).",
    "Inventarie: USB-C 60 W säljer 15 % bättre i Stockholm.",
    "Föreslår prisjustering på Lightning 27 W – upp 5 %.",
    "Lägg till AI-rapport för fortnox-export varje fredag."
  ];

  const notifications = [
    "3 nya kvitton registrerade av anställda.",
    "En ny order skapad för Power Barkarby.",
    "AI-ruttuppdatering tillgänglig för Solna-området."
  ];

  aiSuggestions.innerHTML = suggestions.map(s => `<li>${s}</li>`).join("");
  aiNotifications.innerHTML = notifications.map(n => `<li>${n}</li>`).join("");
  aiTotal.textContent = "AI-analys klar: stabil omsättning, stigande ordervolym och högre marginaler än föregående vecka.";

  /* ---------- AI-RUTT & KARTA ---------- */
  function initMap(targetId, center = [59.334, 18.063], zoom = 10) {
    const container = document.getElementById(targetId);
    if (!container || typeof L === "undefined") return;

    container.innerHTML = "";
    const map = L.map(targetId, { scrollWheelZoom: false }).setView(center, zoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "&copy; OpenStreetMap"
    }).addTo(map);

    const mockPlaces = [
      { name: "Elon Kista", pos: [59.42, 17.94], note: "Vill köpa produkter om 20 dagar" },
      { name: "Mekonomen Solna", pos: [59.36, 18.02], note: "Befintlig kund" },
      { name: "Power Barkarby", pos: [59.41, 17.86], note: "Bra läge för demo" }
    ];

    mockPlaces.forEach(p => {
      L.marker(p.pos).addTo(map)
        .bindPopup(`<b>${p.name}</b><br>${p.note}`);
    });
  }

  // Init mini- och fullkarta
  initMap("map-mini");
  initMap("map-full");

  // Modal-kartan initieras när den öppnas
  const modalAImap = document.getElementById("modal-aimap");
  modalAImap?.addEventListener("close", () => console.log("🗺️ AI-karta stängd"));
  modalAImap?.addEventListener("show", () => initMap("map-modal"));

  /* ---------- AI-RUTT-FÖRSLAG ---------- */
  const aiRoute = $("#ai-route");
  aiRoute.innerHTML = `
    <p><strong>Rekommenderad rutt:</strong></p>
    <ol>
      <li>Start – Acetek HQ (08:00)</li>
      <li>Elon Kista (09:15)</li>
      <li>Mekonomen Solna (11:00)</li>
      <li>Lunch – Mall of Scandinavia (12:30)</li>
      <li>Power Barkarby (14:00)</li>
      <li>Åter till HQ (15:30)</li>
    </ol>
  `;

  // Mock-knappar som triggar AI-logik
  document.querySelectorAll("[data-ai]").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.ai;
      console.log(`🧠 AI-trigger: ${type}`);
      switch (type) {
        case "eco":
          alert("AI-analys av ekonomi: försäljningen drivs av USB-C 60 W.");
          break;
        case "route":
          alert("AI-rutt beräknad! Se högerpanelen → AI-Rutt & Leads.");
          break;
        case "orders":
          alert("AI-orderförslag: skapa ny order för Elon Kista.");
          break;
        case "kpi":
          alert("AI-tolkning av KPI: stabil trend, fortsätt fokusera på Stockholm.");
          break;
        default:
          alert("AI-funktion under utveckling.");
      }
    });
  });

  console.log("✅ AI-funktioner aktiva");
});
