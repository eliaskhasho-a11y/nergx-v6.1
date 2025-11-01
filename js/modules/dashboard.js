
Router.mount('dashboard', ()=>{
  return `
  <section>
    <div class="kpis">
      <div class="kpi"><h3>Omsättning idag</h3><b id="kpiRev"></b><div class="badge">+12 % mot igår</div></div>
      <div class="kpi"><h3>Order idag</h3><b>${State.kpi.orders}</b><div class="badge">3 stora B2B</div></div>
      <div class="kpi"><h3>Bruttomarginal</h3><b>${Math.round(State.kpi.margin*100)} %</b><div class="badge">Stabil nivå</div></div>
    </div>
    <div class="grid cols-3">
      <div class="card">
        <h3>Ekonomi — kombo‑staplar</h3>
        <canvas id="ecoChart" height="160"></canvas>
      </div>
      <div class="card">
        <h3>Schema (dag)</h3>
        <table class="table">
          <tr><th>Tid</th><th>Aktivitet</th></tr>
          <tr><td>09:00</td><td>Orderplock (Jesper)</td></tr>
          <tr><td>11:00</td><td>Kundmöte — Nordic</td></tr>
          <tr><td>14:00</td><td>Inventarie (Lea)</td></tr>
        </table>
      </div>
      <div class="card">
        <h3>Lager — brist / inköp</h3>
        <table class="table">
          <tr><th>SKU</th><th>Produkt</th><th>Nivå</th><th>Status</th></tr>
          ${State.stockAlerts.map(s=>`<tr><td>${s.sku}</td><td>${s.product}</td><td>${s.level}</td><td>${s.status}</td></tr>`).join('')}
        </table>
      </div>
    </div>
  </section>`;
});

window.__hydrate = (hash)=>{
  if(hash!=='dashboard') return;
  document.getElementById('kpiRev').textContent = Formatter.money(State.kpi.revenue);
  const el = document.getElementById('ecoChart');
  if(el){
    new Chart(el, {
      type:'bar',
      data:{
        labels:['Mån','Tis','Ons','Tor','Fre','Lör','Sön'],
        datasets:[
          { label:'Omsättning', data:[120,140,160,130,180,70,60], backgroundColor:'#93c5fd' },
          { label:'Kostnader', data:[60,70,80,65,100,50,45], backgroundColor:'#fecaca' },
          { label:'GM%', data:[40,42,39,41,44,33,31], type:'line', yAxisID:'y1', borderColor:'#7c3aed', tension:.3 }
        ]
      },
      options:{
        responsive:true,
        scales:{ y:{ beginAtZero:true }, y1:{ beginAtZero:true, position:'right', grid:{drawOnChartArea:false} } }
      }
    });
  }
};
