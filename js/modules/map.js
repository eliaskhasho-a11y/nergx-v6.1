export function mapView(el){
  el.innerHTML = `<div class="card"><h2>AI‑Karta</h2><div id="map" style="height:300px;border-radius:10px"></div></div>`;
  const map = L.map('map').setView([59.334, 18.063], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OSM' }).addTo(map);
  L.marker([59.334, 18.063]).addTo(map).bindPopup('Rek. besök: Stock Wireless kl 13:00');
}
