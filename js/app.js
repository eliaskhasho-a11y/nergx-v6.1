// MergX v8.47 – Dashboard + Teamchat

async function loadData() {
  const res = await fetch("./data/mock.json");
  const data = await res.json();

  document.getElementById("revenue").textContent = data.revenue.value;
  document.getElementById("revenueChange").textContent = data.revenue.change;
  document.getElementById("orders").textContent = data.orders.value;
  document.getElementById("ordersChange").textContent = data.orders.change;
  document.getElementById("costs").textContent = data.costs.value;
  document.getElementById("costsChange").textContent = data.costs.change;
  document.getElementById("margin").textContent = data.margin.value;
  document.getElementById("marginChange").textContent = data.margin.change;
  document.getElementById("aiAnalysis").textContent = data.analysis;

  const aiMapList = document.getElementById("aiMapList");
  data.aiMap.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.location} — ${item.note}`;
    aiMapList.appendChild(li);
  });

  const aiSuggestions = document.getElementById("aiSuggestions");
  data.suggestions.forEach((s) => {
    const li = document.createElement("li");
    li.textContent = s;
    aiSuggestions.appendChild(li);
  });

  const aiNotes = document.getElementById("aiNotes");
  data.notes.forEach((n) => {
    const li = document.createElement("li");
    li.textContent = n;
    aiNotes.appendChild(li);
  });

  const aiLeads = document.getElementById("aiLeads");
  data.leads.forEach((l) => {
    const li = document.createElement("li");
    li.textContent = l;
    aiLeads.appendChild(li);
  });
}

// Teamchat funktion
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = chatInput.value.trim();
  if (!msg) return;
  const div = document.createElement("div");
  div.className = "chat-message";
  div.innerHTML = `<strong>🧑‍💼 Du:</strong> ${msg}`;
  chatMessages.appendChild(div);
  chatInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

loadData();
