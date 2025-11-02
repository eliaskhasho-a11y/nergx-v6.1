
import { State } from '../state.js';
export function renderMap(v){
  v.innerHTML=`<div class="card"><h3>AI-Karta</h3><div id="map" style="height:360px;border-radius:12px;border:1px solid var(--border)"></div></div>`;
  if(window.L){
    const map=L.map('map').setView([59.334,18.066],5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'© OpenStreetMap'}).addTo(map);
    State.customers.forEach(c=>{ const m=L.circleMarker([c.lat,c.lng],{radius:6+c.potential/2,color:'#8358ff',fillColor:'#8358ff',fillOpacity:.5}).addTo(map); m.bindPopup(`<b>${c.name}</b><br/>${c.city}<br/>Potential: ${c.potential}/10`);});
  } else { document.getElementById('map').innerHTML='<div class="muted" style="padding:10px">Leaflet ej laddat.</div>'; }
}
