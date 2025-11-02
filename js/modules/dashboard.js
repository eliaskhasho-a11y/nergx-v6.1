
Router.mount('dashboard', ()=>{
  return `
  <section>
    <div class="row" style="justify-content:space-between;margin-bottom:8px">
      <div class="row" style="gap:6px">
        <button class="badge" onclick="Dash.quick('order')">+ Skapa order</button>
        <button class="badge" onclick="Dash.quick('customer')">+ Ny kund</button>
        <button class="badge" onclick="Dash.quick('product')">+ Ny produkt</button>
        <a class="badge" href="#/chat">Öppna chatt</a>
      </div>
      <span class="small">v8.0.1 Patch</span>
    </div>

    <div class="kpis">
      <div class="kpi" data-kpi="revenue"><h3>Omsättning idag</h3><b id="kpiRev"></b><div class="badge">+8 % vs igår</div></div>
      <div class="kpi" data-kpi="orders"><h3>Order idag</h3><b>${State.kpi.orders}</b><div class="badge">5 stora B2B</div></div>
      <div class="kpi" data-kpi="margin"><h3>Bruttomarginal</h3><b>${Math.round(State.kpi.margin*100)} %</b><div class="badge">Stabil</div></div>
      <div class="kpi" data-kpi="costs"><h3>Kostnader</h3><b id="kpiCost"></b><div class="badge">Under budget</div></div>
    </div>

    <div id="expandArea" class="card" style="display:none"></div>

    <div class="grid cols-3">
      <div class="card frost">
        <h3>Ekonomi — kombo-staplar</h3>
        <canvas id="ecoChart" height="160"></canvas>
      </div>
      <div class="card frost">
        <h3>Mini AI-Coach</h3>
        <div id="miniCoach"></div>
      </div>
      <div class="card frost">
        <h3>AI Karta (mini)</h3>
        <div id="miniMap" style="height:180px;border-radius:12px"></div>
      </div>
    </div>

    <div class="modal" id="modal">
      <div class="sheet">
        <div class="row" style="justify-content:space-between;align-items:center;margin-bottom:8px">
          <h3 id="modalTitle">Ny</h3>
          <button class="badge" onclick="Dash.closeModal()">Stäng</button>
        </div>
        <div id="modalBody"></div>
      </div>
    </div>

  </section>`;
});

window.__hydrate = (hash)=>{
  if(hash!=='dashboard') return;
  document.getElementById('kpiRev').textContent = Formatter.money(State.kpi.revenue);
  document.getElementById('kpiCost').textContent = Formatter.money(State.kpi.costs);

  document.querySelectorAll('.kpi').forEach(card=>{
    card.addEventListener('click', ()=> Dash.expand(card.dataset.kpi));
  });

  const el = document.getElementById('ecoChart');
  if(el){
    new Chart(el, {
      type:'bar',
      data:{
        labels:['Mån','Tis','Ons','Tor','Fre','Lör','Sön'],
        datasets:[
          { label:'Omsättning', data:[140,160,180,150,210,90,72], backgroundColor:'rgba(37,99,235,.35)' },
          { label:'Kostnader', data:[70,80,98,76,110,60,54], backgroundColor:'rgba(6,182,212,.30)' },
          { label:'GM%', data:[40,43,39,41,46,33,32], type:'line', yAxisID:'y1', borderColor:'#8b5cf6', tension:.3 }
        ]
      },
      options:{
        responsive:true,
        scales:{ y:{ beginAtZero:true }, y1:{ beginAtZero:true, position:'right', grid:{drawOnChartArea:false} } },
        plugins:{legend:{position:'bottom'}}
      }
    });
  }

  const mini = document.getElementById('miniCoach');
  mini.innerHTML = '<div class="msg ai">Hej! Jag övervakar KPI:er och ger tips i realtid. Klicka en KPI för detaljer.</div>';

  const m = L.map('miniMap', { zoomControl:false, attributionControl:false }).setView([59.3293,18.0686], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:19}).addTo(m);
  [[59.3293,18.0686,'Stockholm'],[61.4981,23.7600,'Tammerfors']].forEach(c=> L.circleMarker(c, {radius:6,color:'#8b5cf6'}).addTo(m));
};

const Dash = {
  expand(key){
    const area = document.getElementById('expandArea');
    const map = {
      revenue: ()=> \`
        <h3>Omsättning — detaljer</h3>
        <canvas id="revChart" height="160"></canvas>
        <p class="small">AI-coach: Driv kampanj i Stockholm — hög konvertering fredag.</p>\`,
      orders: ()=> \`
        <h3>Order — detaljer</h3>
        <table class="table"><tr><th>Kund</th><th>Värde</th></tr>
        \${State.customers.slice(0,3).map(c=>\`<tr><td>\${c.name}</td><td>\${Formatter.money(c.value)}</td></tr>\`).join('')}</table>\`,
      margin: ()=> \`
        <h3>Bruttomarginal — detaljer</h3>
        <p>Senaste 7 dagar: 41 → 46%. Förbättring via lägre inköpspris.</p>\`,
      costs: ()=> \`
        <h3>Kostnader — detaljer</h3>
        <canvas id="costChart" height="160"></canvas>\`
    };
    area.style.display='block';
    area.innerHTML = (map[key] ? map[key]() : '<h3>Detaljer</h3>');
    document.querySelectorAll('.kpi').forEach(k=>k.classList.toggle('active', k.dataset.kpi===key));
    if(key==='revenue'){
      new Chart(document.getElementById('revChart'), {type:'line',
        data:{labels:['v1','v2','v3','v4','v5','v6','v7'], datasets:[{label:'Omsättning', data:[120,135,142,150,162,175,190], borderColor:'#2563eb', tension:.35}]}});
    }
    if(key==='costs'){
      new Chart(document.getElementById('costChart'), {type:'bar',
        data:{labels:['Inköp','Frakt','Lokal','Löner'], datasets:[{label:'Kostnad', data:[110,24,42,45], backgroundColor:'rgba(6,182,212,.35)'}]}});
    }
  },
  quick(type){
    const modal = document.getElementById('modal');
    const title = document.getElementById('modalTitle');
    const body  = document.getElementById('modalBody');
    modal.classList.add('active');
    const forms = {
      order: \`
        <div class="row" style="gap:12px">
          <div style="flex:1">
            <label>Kund</label>
            <select>\${State.customers.map(c=>\`<option>\${c.name}</option>\`).join('')}</select>
          </div>
          <div style="flex:1">
            <label>Betalningsdagar</label>
            <input type="number" value="30">
          </div>
        </div>
        <label>Produkter</label>
        <select>\${State.products.map(p=>\`<option>\${p.sku} — \${p.name}</option>\`).join('')}</select>
        <div class="row" style="justify-content:flex-end"><button class="badge" onclick="Dash.submit('order')">Skapa faktura</button></div>\`,
      customer: \`
        <div class="row" style="gap:12px">
          <div style="flex:1"><label>Företag</label><input type="text" placeholder="Namn"></div>
          <div style="flex:1"><label>Org.nr</label><input type="text" placeholder="556..."></div>
        </div>
        <div class="row" style="gap:12px">
          <div style="flex:1"><label>Kontaktperson</label><input type="text"></div>
          <div style="flex:1"><label>E-post</label><input type="email"></div>
        </div>
        <label>Adress</label><input type="text" placeholder="Gata, Stad">
        <div class="row" style="justify-content:flex-end"><button class="badge" onclick="Dash.submit('customer')">Spara kund</button></div>\`,
      product: \`
        <div class="row" style="gap:12px">
          <div style="flex:2"><label>Produktnamn</label><input type="text"></div>
          <div style="flex:1"><label>SKU</label><input type="text"></div>
        </div>
        <div class="row" style="gap:12px">
          <div style="flex:1"><label>Lagersaldo</label><input type="number" value="0"></div>
          <div style="flex:1"><label>Pris (SEK)</label><input type="number" value="0"></div>
        </div>
        <div class="row" style="justify-content:flex-end"><button class="badge" onclick="Dash.submit('product')">Lägg till</button></div>\`
    };
    title.textContent = {'order':'Ny order','customer':'Ny kund','product':'Ny produkt'}[type] || 'Ny';
    body.innerHTML = forms[type] || '<p>Formulär saknas</p>';
  },
  closeModal(){ document.getElementById('modal').classList.remove('active') },
  submit(kind){
    Notis.push(kind==='order'?'Faktura skapad (mock)':'Sparad (mock)');
    this.closeModal();
  }
};
