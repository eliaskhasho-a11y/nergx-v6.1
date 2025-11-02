
Router.mount('ai-map', ()=>{
  return `
  <section class="grid cols-2">
    <div class="card">
      <h3>AI-Karta</h3>
      <div id="map" style="height:420px;border-radius:12px;"></div>
    </div>
    <div class="card">
      <h3>Rekommenderade besök</h3>
      <ul id="recList" class="list"></ul>
    </div>
  </section>`;
});
window.__hydrate = (hash)=>{
  if(hash!=='ai-map') return;
  const map = L.map('map').setView([59.3293,18.0686], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '&copy; OpenStreetMap'
  }).addTo(map);
  const cities = [
    {name:'Stockholm', coords:[59.3293,18.0686], value:220000},
    {name:'Tammerfors', coords:[61.4981,23.7600], value:175000},
    {name:'Västerås', coords:[59.6099,16.5448], value:122000},
    {name:'Göteborg', coords:[57.7089,11.9746], value:98000}
  ];
  cities.forEach(c=>{
    L.circleMarker(c.coords, {radius:8, color:'#8b5cf6'}).addTo(map).bindPopup(`${c.name}: ${Formatter.money(c.value)}`);
  });
  const rec = document.getElementById('recList');
  rec.innerHTML = cities.sort((a,b)=>b.value-a.value)
    .map(c=>`<li>${c.name} — hög potential (${Formatter.money(c.value)})</li>`).join('');
};
