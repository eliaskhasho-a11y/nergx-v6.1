// Simple client-side router + init
const view = document.getElementById('view');
const templates = {
  dashboard: document.getElementById('view-dashboard').innerHTML,
  placeholder: document.getElementById('view-placeholder').innerHTML,
};

const routes = {
  dashboard: () => loadDashboard(),
  orders: () => loadPlaceholder('Ordrar & fakturor'),
  customers: () => loadPlaceholder('Kunder (CRM)'),
  inventory: () => loadPlaceholder('Inventarie'),
  employees: () => loadPlaceholder('Anställda'),
  files: () => loadPlaceholder('Filer & kvitton'),
  aimap: () => loadPlaceholder('AI-karta'),
  chat: () => loadPlaceholder('Chatt'),
  settings: () => loadPlaceholder('Inställningar'),
};

// Sidebar / nav
const navButtons = [...document.querySelectorAll('.nav-item')];
navButtons.forEach(b=>{
  b.addEventListener('click', ()=>{
    navButtons.forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    routeTo(b.dataset.route);
    if (window.innerWidth < 860) document.getElementById('sidebar').classList.remove('open');
  });
});
document.getElementById('gotoDashboard').onclick = ()=>routeTo('dashboard');
document.getElementById('menuToggle').onclick = ()=>document.getElementById('sidebar').classList.toggle('open');

function routeTo(name){
  history.replaceState({}, "", `#/${name}`);
  (routes[name]||routes.dashboard)();
}

// ========== Views ==========
function loadPlaceholder(title){
  view.innerHTML = templates.placeholder;
  document.getElementById('ph-title').textContent = title;
}

function loadDashboard(){
  view.innerHTML = templates.dashboard;

  // KPI expandera
  document.querySelectorAll('[data-expand]').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const key = btn.getAttribute('data-expand');
      openOverlay(key);
    });
  });

  // Ask AI knappar
  document.querySelectorAll('[data-ask]').forEach(btn=>{
    btn.addEventListener('click', ()=> {
      const topic = btn.getAttribute('data-ask');
      openOverlay(topic, true);
    });
  });

  // Ekonomi-graf (full width i kortet)
  const ctx = document.getElementById('ecoChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['v1','v2','v3','v4','v5'],
      datasets: [
        {label:'Omsättning', data:[100,120,90,140,160], backgroundColor:'#93c5fd'},
        {label:'Kostnader', data:[50,60,45,60,70], backgroundColor:'#c7d2fe'},
        {type:'line', label:'Brutto%', data:[60,62,61,60,63], borderColor:'#1d4ed8', tension:.4, yAxisID:'y1'}
      ]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      scales:{
        y:{beginAtZero:true, grid:{color:'#eef2f7'}},
        y1:{position:'right', min:0, max:100, grid:{drawOnChartArea:false}}
      },
      plugins:{ legend:{labels:{boxWidth:14}} }
    }
  });

  // Mini-map (Leaflet) + mock AI
  const map = L.map('miniMap').setView([59.334, 18.063], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '&copy; OpenStreetMap'
  }).addTo(map);
  L.marker([59.402, 17.944]).addTo(map).bindPopup('Elon Kista');
  L.marker([59.363, 18.005]).addTo(map).bindPopup('Power Solna');
  L.marker([59.353, 17.939]).addTo(map).bindPopup('Mekonomen Bromma');

  // Chatt
  const chatWin = document.getElementById('chatWindow');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  chatInput.addEventListener('keydown', e=>{
    if(e.key==='Enter'){ e.preventDefault(); sendMsg(); }
  });
  chatSend.onclick = sendMsg;
  function sendMsg(){
    const val = chatInput.value.trim();
    if(!val) return;
    const b = document.createElement('div');
    b.className = 'bubble bubble-right';
    b.textContent = val;
    chatWin.appendChild(b);
    chatInput.value='';
    chatWin.scrollTop = chatWin.scrollHeight;
  }

  // Röstinspelning (mock lokalt)
  let mediaRecorder, chunks=[];
  const recBtn = document.getElementById('recBtn');
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    recBtn.onclick = async ()=>{
      if(!mediaRecorder || mediaRecorder.state==='inactive'){
        const stream = await navigator.mediaDevices.getUserMedia({audio:true});
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = e=>chunks.push(e.data);
        mediaRecorder.onstop = ()=>{
          const blob = new Blob(chunks, {type:'audio/webm'}); chunks=[];
          const url = URL.createObjectURL(blob);
          const b = document.createElement('div');
          b.className='bubble bubble-right';
          b.innerHTML = `🔊 <a href="${url}" download="mergx-voice.webm">Röstmeddelande (hämta)</a>`;
          chatWin.appendChild(b);
          chatWin.scrollTop = chatWin.scrollHeight;
        };
        mediaRecorder.start();
        recBtn.textContent='⏹️'; recBtn.title='Stoppa inspelning';
      }else{
        mediaRecorder.stop();
        recBtn.textContent='🎙️'; recBtn.title='Spela in röst';
      }
    };
  } else {
    recBtn.disabled = true; recBtn.title = 'Mikrofon ej tillgänglig';
  }

} // end dashboard

// ===== Overlay (expand + AI mock) =====
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayBody = document.getElementById('overlayBody');
const overlayClose = document.getElementById('overlayClose');
const overlayAsk = document.getElementById('overlayAsk');

overlayClose.onclick = ()=>overlay.classList.add('hidden');
overlay.addEventListener('click', e=>{
  if(e.target === overlay) overlay.classList.add('hidden'); // stäng vid klick utanför
});

function openOverlay(key, ask=false){
  const titles = {
    oms:'Omsättning — detalj',
    ord:'Order — detalj',
    kost:'Kostnader — detalj',
    gm:'Bruttomarginal — detalj',
    economy:'Ekonomi — analys',
    chat:'Teamchatt — analys',
    map:'AI-karta — analys'
  };
  overlayTitle.textContent = titles[key] || 'Analys';

  const blocks = {
    oms:`<ul>
      <li>Idag: <b>42 850 kr</b> <span class="kpi-up">(+12%)</span></li>
      <li>7 dagar: 312 400 kr</li>
      <li>30 dagar: 1 224 900 kr</li>
    </ul>`,
    ord:`<p>Order inflöde förmiddag domineras av B2B (vinstmarginal +3,2 pp).</p>`,
    kost:`<p>Kostnader ned <b>2,1%</b> mot igår — lager & frakt står för största minskningen.</p>`,
    gm:`<p>Bruttomarginal stabil på <b>41,5%</b>. Prognos månad: <b>+0,9 pp</b>.</p>`,
    economy:`<p>AI noterar ökande omsättning v4–v5 och föreslår ökad inköpskvot för USB-C 60W.</p>`,
    chat:`<p>AI föreslår uppföljning: “Mötet 11:00 – skapa notis & uppgift.”</p>`,
    map:`<p>Rek. rutt: Elon Kista → Power Solna → Mekonomen Bromma (43 min). Lägg notis för “Elon Kista vill köpa om 20 dagar”.</p>`
  };
  overlayBody.innerHTML = blocks[key] || '<p>Ingen data.</p>';

  overlayAsk.onclick = ()=> {
    overlayBody.insertAdjacentHTML('beforeend',
      `<div class="hint" style="margin-top:10px">🤖 AI: Detta är en mock-analys. I nästa version kopplar vi OpenAI/DeepSeek/Ollama.</div>`);
  };

  overlay.classList.remove('hidden');
}

// Init route
routeTo((location.hash.replace('#/',''))||'dashboard');
