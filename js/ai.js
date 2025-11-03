/* =====================================================
   MergX v8.35 • AI Layer (Simulated Intelligence Engine)
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  console.log("AI Layer activated 🧠");

  const aiSummary = document.getElementById("ai-summary-text");
  const mapArea = document.getElementById("mapArea");
  const chatMessages = document.getElementById("chatMessages");

  /* === AI MOCK DATA === */
  const stores = [
    { name: "Elon Kista", city: "Stockholm", note: "Vill köpa produkter om 20 dagar" },
    { name: "Power Täby", city: "Täby", note: "Intresserade av laddare (A-Stick)" },
    { name: "Mekonomen Solna", city: "Solna", note: "Behöver offert på 30 kablar" },
  ];

  const aiInsights = [
    "Försäljningen ökar 12 % i norra Stockholm.",
    "Tre återförsäljare har låg lagernivå – föreslå påfyllning.",
    "Säljarna har i genomsnitt 1,8 möten per dag denna vecka.",
    "AI-förslag: prioritera besök hos Power-kedjan imorgon.",
  ];

  /* === AI-SAMMANFATTNING ROTATION === */
  let insightIndex = 0;
  setInterval(() => {
    aiSummary.textContent = aiInsights[insightIndex];
    insightIndex = (insightIndex + 1) % aiInsights.length;
  }, 6000);

  /* === AI-KARTA MOCK: VISAR NÄRLIGGANDE BUTIKER === */
  if (mapArea) {
    const list = document.createElement("ul");
    list.className = "store-list";
    stores.forEach((s) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${s.name}</strong> – ${s.city} <br><span>${s.note}</span>`;
      list.appendChild(li);
    });
    mapArea.innerHTML = "";
    mapArea.appendChild(list);
  }

  /* === SMART ROUTE-PLANER MOCK === */
  function suggestRoute() {
    const sorted = stores.sort(() => Math.random() - 0.5);
    return sorted.map((s, i) => `${i + 1}. ${s.name} (${s.city})`).join("\n");
  }

  /* === AI-CHATT: DJUPARE ANALYS === */
  function addAIResponse(userText) {
    const msg = document.createElement("div");
    msg.classList.add("msg", "system");

    let reply = "Jag analyserar ...";

    if (/kund|customer/i.test(userText))
      reply = "Totalt 54 aktiva kunder. 3 nya potentiella identifierade via kart-AI.";
    else if (/order/i.test(userText))
      reply = "Orderflödet är stabilt. Rekommenderar uppföljning på 2 försenade fakturor.";
    else if (/rutt|route/i.test(userText))
      reply = `Föreslagen smart sälj-rutt:\n${suggestRoute()}`;
    else if (/kostnad|budget|utgift/i.test(userText))
      reply = "Utgifterna ökade 5 % senaste veckan. AI föreslår kostnadsöversyn av leverantörer.";
    else if (/hej|hello/i.test(userText))
      reply = "Hej! Jag är din MergX AI-assistent. Vad vill du veta?";
    else if (/notis|note/i.test(userText))
      reply = "AI har skapat en notis för Elon Kista: uppföljning om 20 dagar.";
    else
      reply = "Jag håller koll på data och förbereder en ny analys.";

    setTimeout(() => {
      msg.textContent = reply;
      chatMessages.appendChild(msg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 700);
  }

  // Knyt till chat-input
  const chatInput = document.getElementById("chatInput");
  const chatSend = document.getElementById("chatSend");
  if (chatSend && chatInput) {
    chatSend.addEventListener("click", () => addAIResponse(chatInput.value));
  }

  /* === AI-NOTISER (visual feedback) === */
  function createAINotification(text) {
    const note = document.createElement("div");
    note.className = "ai-toast";
    note.textContent = `🤖 ${text}`;
    document.body.appendChild(note);
    setTimeout(() => note.classList.add("show"), 50);
    setTimeout(() => note.remove(), 4500);
  }

  // Exempel på automatisk AI-notis
  setTimeout(() => createAINotification("AI har upptäckt låg lagerstatus på 2 artiklar."), 9000);
});
