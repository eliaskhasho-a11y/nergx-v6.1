const MapView = {
  render(){
    return `
      <div class="card">
        <div class="hd">AI-karta (Leaflet)</div>
        <div class="bd" style="height:360px">
          <div id="map" style="height:340px; border-radius:12px"></div>
        </div>
      </div>
    `;
  },
  afterRender(){
    const map = L.map('map').setView([59.334591, 18.063240], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19, attribution: '&copy; OpenStreetMap'
    }).addTo(map);
    const pts = [
      [59.334591, 18.063240, 'Stockholm – hög potential'],
      [57.708870, 11.974560, 'Göteborg – stigande'],
      [55.604981, 13.003822, 'Malmö – stabilt']
    ];
    pts.forEach(p=> L.marker([p[0],p[1]]).addTo(map).bindPopup(p[2]));
  }
};
