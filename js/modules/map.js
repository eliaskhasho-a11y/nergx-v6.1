
App.routes['map'] = (el)=>{
  el.innerHTML = `<div class="panel" style="padding:10px">
    <div id="mapbox" style="height:420px;border-radius:12px"></div>
  </div>`;
  const m = L.map('mapbox').setView([59.334,18.066], 6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '&copy; OpenStreetMap'
  }).addTo(m);
  L.marker([59.334,18.066]).addTo(m).bindPopup('Stockholm – hög konvertering');
  L.marker([57.708,11.974]).addTo(m).bindPopup('Göteborg – kampanj under test');
};
