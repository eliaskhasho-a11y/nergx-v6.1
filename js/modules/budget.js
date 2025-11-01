
Router.mount('budget', ()=>{
  return `
  <section class="grid">
    <div class="card">
      <h3>Budget vs utfall</h3>
      <canvas id="budgetChart" height="180"></canvas>
    </div>
    <div class="card">
      <h3>AI-insikt</h3>
      <p>Din marginal väntas öka med <b>+2.4 %</b> nästa månad p.g.a. sänkt inköpspris och högre B2B‑volym.</p>
      <p class="badge">Prognos — mock</p>
    </div>
  </section>`;
});
window.__hydrate = (hash)=>{
  if(hash!=='budget') return;
  const el = document.getElementById('budgetChart');
  if(!el) return;
  new Chart(el, {
    type:'line',
    data:{
      labels:['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
      datasets:[
        { label:'Budget', data:[220,240,260,260,280,300,310,320,330,350,370,380], borderColor:'#94a3b8', tension:.35 },
        { label:'Utfal', data:[200,250,255,270,295,285,315,330,328,342,360,390], borderColor:'#2563eb', tension:.35 }
      ]
    },
    options:{ responsive:true, plugins:{legend:{position:'bottom'}}}
  });
};
