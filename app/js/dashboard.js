
window.MX.renderDashboard = (el)=>{
  el.innerHTML = `
  <div class="grid">
    <div class="card" style="grid-column: span 12;">
      <div class="metrics">
        <div class="metric"><div class="caption">Omsättning idag</div><div class="value">324 500 kr</div><div class="note">+12 % mot igår</div></div>
        <div class="metric"><div class="caption">Order idag</div><div class="value">71</div><div class="note">3 stora B2B</div></div>
        <div class="metric"><div class="caption">Bruttomarginal</div><div class="value">62 %</div><div class="note">Stabil nivå</div></div>
      </div>
    </div>

    <div class="card" style="grid-column: span 12;">
      <h4>Ekonomi — kombostaplar</h4>
      <div class="note">(Placeholder graf — aktiveras i 7.4)</div>
      <div style="height:180px; border:1px dashed var(--border); border-radius:12px; margin-top:8px;"></div>
    </div>

    <div class="card" style="grid-column: span 6;">
      <h4>Schema (dag)</h4>
      <ul class="note" style="margin-top:4px">
        <li>09:00 Orderplock (Jesper)</li>
        <li>11:00 Kundmöte — Nordic</li>
        <li>14:00 Inventarie (Lea)</li>
      </ul>
    </div>

    <div class="card" style="grid-column: span 6;">
      <h4>Lager — brist / inköp</h4>
      <table class="table">
        <thead><tr><th>SKU</th><th>Produkt</th><th>Nivå</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>CAR-CHG-60W</td><td>Bil‑laddare 60W</td><td>4</td><td style="color:var(--danger)">brist</td></tr>
          <tr><td>LIGHT‑27W</td><td>LED‑lampa 27W</td><td>12</td><td>låg</td></tr>
        </tbody>
      </table>
    </div>

    <div class="card" style="grid-column: span 12;">
      <h4>AI‑Karta (mini)</h4>
      <div class="note">Kart‑placeholder — full i v7.4. Rek. besök nära dig baserat på potential.</div>
      <div style="height:240px; border:1px dashed var(--border); border-radius:12px; margin-top:8px; display:flex; align-items:center; justify-content:center; color:var(--muted)">Karta</div>
    </div>
  </div>`;
};
