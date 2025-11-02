
Router.mount('dashboard', ()=>{
  return `
  <section>
    <div class="kpis">
      <div class="kpi"><h3>Omsättning idag</h3><b id="kpiRev"></b><div class="badge">+8 % mot igår</div></div>
      <div class="kpi"><h3>Order idag</h3><b>${State.kpi.orders}</b><div class="badge">5 stora B2B</div></div>
      <div class="kpi"><h3>Bruttomarginal</h3><b>${Math.round(State.kpi.margin*100)} %</b><div class="badge">Stabil</div></div>
      <div class="kpi"><h3>Kostnader</h3><b id="kpiCost"></b><div class="badge">Under budget</div></div>
    </div>
    <div class="grid cols-3">
      <div class="card frost">
        <h3>Ekonomi — kombo-staplar</h3>
        <canvas id="ecoChart" height="160"></canvas>
      </div>
      <div class="card frost">
        <h3>Schema (dag)</h3>
        <table class="table">
          <tr><th>Tid</th><th>Aktivitet</th></tr>
          <tr><td>09:00</td><td>Orderplock (Jesper)</td></tr>
          <tr><td>11:00</td><td>Kundmöte — Åhléns</td></tr>
          <tr><td>14:00</td><td>Inventarie (Lea)</td></tr>
        </table>
      </div>
      <div class="card frost">
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
  document.getElementById('kpiCost').textContent = Formatter.money(State.kpi.costs);
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
};
