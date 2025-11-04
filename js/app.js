// MergX v8.49 – Dashboard + AI interaktiv
let data;

async function loadData() {
  const res = await fetch("./data/mock.json");
  data = await res.json();
  updateDashboard();
  renderChart();
}

// === Dashboard-bindningar ===
function updateDashboard() {
  const ids = ["revenue","orders","costs","margin"];
  ids.forEach(id => {
    document.getElementById(id).textContent = data[id].value;
    document.getElementById(id+"Change").textContent = data[id].change;
  });
  document.getElementById("aiAnalysis").textContent = data.analysis;

  // AI-lister
  fillList("aiMapList", data.aiMap.map(i => `${i.location} — ${i.note}`));
  fillList("aiSuggestions", data.suggestions);
  fillList("aiNotes", data.notes);
  fillList("aiLeads", data.leads);
}
function fillList(id, arr){
  const el = document.getElementById(id);
  el.innerHTML = "";
  arr.forEach(item=>{
    const li=document.createElement("li");
    li.textContent=item;
    el.appendChild(li);
  });
}

// === Chart.js ===
let chart;
function renderChart(){
  const ctx=document.getElementById("chartCanvas");
  chart=new Chart(ctx,{
    type:"line",
    data:{
      labels:["Mån","Tis","Ons","Tor","Fre"],
      datasets:[
        {label:"Omsättning",data:[120,150,180,205,240],borderColor:"#4de3c2",backgroundColor:"rgba(77,227,194,0.15)",fill:true,tension:0.35},
        {label:"Kostnader",data:[80,90,100,110,115],borderColor:"#ff6faF",backgroundColor:"rgba(255,111,175,0.12)",fill:true,tension:0.35}
      ]
    },
    options:{
      plugins:{legend:{labels:{color:"#dce5ff"}}},
      scales:{
        x:{ticks:{color:"#c7d2ff"},grid:{color:"rgba(255,255,255,0.07)"}},
        y:{ticks:{color:"#c7d2ff"},grid:{color:"rgba(255,255,255,0.07)"}}
      }
    }
  });
}

// === Modal / Expanderbar info ===
const modal=document.getElementById("expandModal");
const backdrop=document.getElementById("modalBackdrop");
const closeBtn=document.getElementById("closeModal");

document.querySelectorAll(".stat-card").forEach(card=>{
  card.addEventListener("click",()=>openModal(card.dataset.type));
});
function openModal(type){
  const titles={
    revenue:"Omsättning",
    orders:"Ordrar",
    costs:"Kostnader",
    margin:"Bruttomarginal"
  };
  document.getElementById("modalTitle").textContent=titles[type]||"Detaljer";
  document.getElementById("modalDetails").textContent=data[type].details || "Data laddas...";
  document.getElementById("aiModalAnalysis").textContent=data[type].ai || aiSuggest(type);
  modal.classList.remove("hidden");
}
function aiSuggest(type){
  switch(type){
    case "revenue":return "AI: Omsättningen ökar stabilt. Fortsätt fokus på USB-C 60 W och kampanjer i norr.";
    case "orders":return "AI: Högsta orderaktivitet mellan 09-11 och 14-16. Planera utskick före toppar.";
    case "costs":return "AI: Kostnader +1,1 %. Förhandla fraktzon 2 och kombinera leveranser.";
    case "margin":return "AI: Marginal +0,3 pp. Testa 2 % prisjustering på Lightning-serien.";
    default:return "AI: Ingen analys tillgänglig just nu.";
  }
}
function closeModal(){ modal.classList.add("hidden"); }
closeBtn.addEventListener("click",closeModal);
backdrop.addEventListener("click",closeModal);
document.addEventListener("keydown",e=>{ if(e.key==="Escape")closeModal(); });

// === Teamchatt ===
const chatForm=document.getElementById("chatForm");
const chatInput=document.getElementById("chatInput");
const chatMessages=document.getElementById("chatMessages");
chatForm.addEventListener("submit",e=>{
  e.preventDefault();
  const msg=chatInput.value.trim();
  if(!msg)return;
  const div=document.createElement("div");
  div.className="chat-message";
  div.innerHTML=`<strong>Du:</strong> ${msg}`;
  chatMessages.appendChild(div);
  chatInput.value="";
  chatMessages.scrollTop=chatMessages.scrollHeight;
});

// === Auto-uppdatering varje 60 s ===
setInterval(()=>{
  if(!data)return;
  const base=parseInt(data.revenue.value.replace(/\D/g,""));
  data.revenue.value=(base+Math.floor(Math.random()*600)).toLocaleString("sv-SE")+" kr";
  updateDashboard();
},60000);

loadData();
