
window.MX.renderMap = (el)=>{
  el.innerHTML = `
    <div class="card">
      <h4>AI‑Karta</h4>
      <div class="note">Förberedd för Leaflet/OSM. Vi visar kundpunkter + AI‑rekommendationer (besök/kampanj).</div>
      <div id="mapBox" style="height:360px; border:1px dashed var(--border); border-radius:12px; margin-top:8px; display:flex; align-items:center; justify-content:center; color:var(--muted)">Karta aktiveras i 7.4</div>
    </div>
  `;
};
