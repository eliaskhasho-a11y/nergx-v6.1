/* MergX v8.34 – AI & Data Mock (populering + modul-analys + notiser) */

async function loadMockData(){
  try{
    const res = await fetch('./data/mock.json',{cache:'no-store'});
    const data = await res.json();
    populateKPIs(data);
    populateCustomers(data);
    populateInventory(data);
    populateEmployees(data);
    populateOrders(data);
    populateNotifs(data);
    aiTotalWrite(data);
    drawEcoChart(data);
  }catch(err){
    console.error('mock.json saknas eller kunde inte läsas', err);
  }
}

/* KPI */
function pct(v,base){ return Math.min(100, Math.round((v/base)*100)); }
function populateKPIs(data){
  const wrap = document.querySelector('#kpiContainer'); if(!wrap) return;
  wrap.innerHTML = `
    <div class="card kpi__card" data-title="Omsättning" data-module="omsättning">
      <div class="kpi__value">${data.kpi.omsättning.toLocaleString()} SEK</div>
      <div class="kpi__bar"><span style="width:${pct(data.kpi.omsättning, data.kpi.budget)}%"></span></div>
    </div>
    <div class="card kpi__card" data-title="Kostnader" data-module="kostnader">
      <div class="kpi__value">${data.kpi.kostnader.toLocaleString()} SEK</div>
      <div class="kpi__bar"><span style="width:${pct(data.kpi.kostnader, data.kpi.budget)}%"></span></div>
    </div>
    <div class="card kpi__card" data-title="Vinst" data-module="vinst">
      <div class="kpi__value">${data.kpi.vinst.toLocaleString()} SEK</div>
      <div class="kpi__bar"><span style="width:${pct(data.kpi.vinst, data.kpi.budget)}%"></span></div>
    </div>
  `;
}

/* AI – total analys */
function aiTotalWrite(data){
  const el = document.querySelector('#aiTotal'); if(!el) return;
  el.textContent = `AI: Omsättning ${pct(data.kpi.omsättning,data.kpi.budget)}% av budget. Kostnader stabila.
Rek: Planera Täby-besök (lead) & höj lager för P001 (+15%).`;
}

/* Customers */
function populateCustomers(data){
  const tb = document.querySelector('#customerRows'); if(!tb) return;
  tb.innerHTML = data.customers.map(c=>`
    <tr>
      <td><button class="chip" data-view="customer">${c.name}</button></td>
      <td>${c.city}</td>
      <td>${c.status}</td>
      <td>${c.contact}</td>
      <td>
        <button class="chip" data-view="customer">Visa</button>
        <button class="chip">Redigera</button>
        <button class="chip">Ta bort</button>
      </td>
    </tr>
  `).join('');
}

/* Inventory */
function populateInventory(data){
  const tb = document.querySelector('#inventoryRows'); if(!tb) return;
  tb.innerHTML = data.inventory.map(p=>`
    <tr>
      <td>${p.id}</td>
      <td><button class="chip" data-view="product">${p.name}</button></td>
      <td>${p.type}</td>
      <td>${p.stock}</td>
      <td>${p.price} SEK</td>
      <td>
        <button class="chip" data-view="product">Visa</button>
        <button class="chip">Redigera</button>
        <button class="chip">Ta bort</button>
      </td>
    </tr>
  `).join('');
}

/* Employees */
function populateEmployees(data){
  const tb = document.querySelector('#employeeRows'); if(!tb) return;
  tb.innerHTML = data.employees.map(e=>`
    <tr>
      <td><button class="chip" data-view="employee">${e.name}</button></td>
      <td>${e.role}</td>
      <td>${e.email}</td>
      <td>${e.phone}</td>
      <td>
        <button class="chip" data-view="employee">Visa</button>
        <button class="chip">Redigera</button>
        <button class="chip">Ta bort</button>
      </td>
    </tr>
  `).join('');
}

/* Orders */
function populateOrders(data){
  const tb = document.querySelector('#orderRows'); if(!tb) return;
  tb.innerHTML = data.orders.map(o=>`
    <tr>
      <td>${o.no}</td>
      <td>${o.customer}</td>
      <td>${o.date}</td>
      <td>${o.amount} SEK</td>
      <td>${o.status}</td>
      <td>
        <button class="chip btn-preview">👁 Förhandsvisa</button>
        <button class="chip">⬇︎ PDF</button>
      </td>
    </tr>
  `).join('');
}

/* Notifications */
function populateNotifs(data){
  const list = document.querySelector('#notifList'); if(!list) return;
  list.innerHTML = data.notifications.map(n=>`<li>🔔 ${n}</li>`).join('');
  if(window.updateBadge) window.updateBadge(data.notifications.length);
}

/* Modulvisa AI-texter */
function aiModuleAnalysis(module){
  const m = {
    "omsättning":"Trend +6% v/v. Höj säljmål Region Norr +12%.",
    "kostnader":"Stabila. Rek: förhandla fraktavtal (-7%).",
    "vinst":"Bra marginal. Paketera bil-laddare + kabel.",
    "ekonomi":"Balans OK. Flytta 15k från marknad → lager.",
    "total":"Fokus: Täby & Sundbyberg; följ upp leads.",
    "karta":"3 leads inom 15 km. Föreslagen rutt skapad (mock)."
  };
  return m[module] || "AI-analys saknas.";
}
window.aiModuleAnalysis = aiModuleAnalysis;

/* Enkel eco-chart (utan lib) */
function drawEcoChart(data){
  const c = document.querySelector('#ecoCanvas'); if(!c) return;
  const ctx = c.getContext('2d');
  c.width = c.parentElement.clientWidth - 24;
  c.height = c.parentElement.clientHeight - 24;
  const bars = [
    {label:'Oms', val:data.kpi.omsättning, color:'#3b82f6'},
    {label:'Kost', val:data.kpi.kostnader, color:'#7dd3fc'},
    {label:'Vinst', val:data.kpi.vinst, color:'#8b5cf6'}
  ];
  const max = Math.max(...bars.map(b=>b.val)) * 1.1;
  const pad = 40, w = c.width - pad*2, h = c.height - pad*2;
  ctx.clearRect(0,0,c.width,c.height);
  ctx.fillStyle = 'rgba(255,255,255,.1)';
  ctx.fillRect(pad, pad, w, h);
  const bw = w / (bars.length*2);
  bars.forEach((b,i)=>{
    const x = pad + i*2*bw + bw*0.5;
    const bh = Math.max(4, (b.val/max)*h);
    const y = pad + (h - bh);
    ctx.fillStyle = b.color;
    ctx.fillRect(x, y, bw, bh);
    ctx.fillStyle = 'rgba(255,255,255,.8)';
    ctx.fillText(b.label, x, pad+h+16);
  });
}

/* Start */
loadMockData();
