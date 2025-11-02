
Router.mount('budget', ()=>{
  return `
  <section class="grid cols-2">
    <div class="card">
      <h3>Budget vs utfall</h3>
      <canvas id="budgetChart" height="200"></canvas>
    </div>
    <div class="card">
      <h3>AI-prognos</h3>
      <p>Prognos: +4.2% omsättning, kostnader -1.1%, marginal +2.0 p.p.</p>
      <p class="badge">Mock</p>
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
        { label:'Utfall', data:[210,250,255,270,295,285,315,330,328,342,360,395], borderColor:'#2563eb', tension:.35 }
      ]
    },
    options:{ responsive:true, plugins:{legend:{position:'bottom'}}}
  });
};
