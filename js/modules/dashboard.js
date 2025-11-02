export function dashboardView(el, State, pushNotis){
  el.innerHTML = `
    <div class="kpis">
      <div class="card kpi">
        <div class="label small">Omsättning idag</div>
        <div class="val">${Intl.NumberFormat('sv-SE').format(State.kpi.revenue)} kr</div>
        <div class="meta">+12 % mot igår</div>
      </div>
      <div class="card kpi">
        <div class="label small">Order idag</div>
        <div class="val">${State.kpi.orders}</div>
        <div class="meta">3 stora B2B</div>
      </div>
      <div class="card kpi">
        <div class="label small">Bruttomarginal</div>
        <div class="val">${State.kpi.margin} %</div>
        <div class="meta">Stabil nivå</div>
      </div>
    </div>

    <div class="grid cols-3">
      <div class="card">
        <h3>Ekonomi — kombostaplar</h3>
        <canvas id="ecoChart" height="120"></canvas>
      </div>
      <div class="card">
        <h3>Schema (dag)</h3>
        <ul>
          <li>09:00 Orderplock (Jesper)</li>
          <li>11:00 Kundmöte — Nordic</li>
          <li>14:00 Inventarie (Lea)</li>
        </ul>
      </div>
      <div class="card">
        <h3>Lager — brist / inköp</h3>
        <table>
          <thead><tr><th>SKU</th><th>Produkt</th><th>Nivå</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>CAR‑CHG‑60W</td><td>Bil‑laddare 60W</td><td>4</td><td>brist</td></tr>
            <tr><td>LIGHT‑27W</td><td>LED‑lampa 27W</td><td>12</td><td>låg</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;

  const ctx = el.querySelector('#ecoChart');
  if(ctx && window.Chart){
    new window.Chart(ctx, {
      type:'bar',
      data:{labels:['Oms','Kost','GM%','Budget'], datasets:[
        {label:'Värde', data:[State.kpi.revenue, 180000, State.kpi.margin, 300000]}
      ]},
      options:{responsive:true, plugins:{legend:{display:false}}}
    });
  }
}
