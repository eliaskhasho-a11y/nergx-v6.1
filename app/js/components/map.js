
function MapView(){
  const card=el('div','card');card.innerHTML=`<h3>AI-Karta</h3><div class="small">Visar kundpunkter & AI-rekommendationer (mock v7.3a)</div>
  <div id="fullMap" style="height:420px;margin-top:8px;border-radius:12px;overflow:hidden"></div><div class="footer">Tips: klicka på punkt för åtgärdsförslag.</div>`;
  setTimeout(()=>{if(!window.L){card.appendChild(el('div','small','Leaflet kunde inte laddas.'));return;}const m=L.map('fullMap').setView([59.334,18.066],9);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OSM'}).addTo(m);[{p:[59.334,18.066],t:'Stock Wireless – Hög potential i vecka 45'},{p:[59.29,18.08],t:'Elon Ljud & Bild – Brist på CAR-CHG-60W (4 kvar)'},{p:[59.40,17.94],t:'Nordic IT – Föreslå Q4-bundle'}].forEach(x=>L.marker(x.p).addTo(m).bindPopup(x.t));},20);
  return card;
}
