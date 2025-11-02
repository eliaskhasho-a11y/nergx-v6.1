
App.routes['dashboard'] = (el)=>{
  el.innerHTML = `
  <div class="grid kpis">
    <div class="panel kpi"><h4>Omsättning idag</h4><div class="v" id="kpi_revenue">324 500 kr</div><div class="small">+12 % mot igår</div></div>
    <div class="panel kpi"><h4>Order idag</h4><div class="v">71</div><div class="small">3 stora B2B</div></div>
    <div class="panel kpi"><h4>Bruttomarginal</h4><div class="v">62 %</div><div class="small">Stabil nivå</div></div>
  </div>
  <div class="flex">
    <div class="panel col" style="padding:16px">
      <div class="small" style="font-weight:600;margin:0 0 10px">Ekonomi — kombostaplar</div>
      <canvas id="revChart" height="120"></canvas>
    </div>
    <div class="panel col" style="padding:16px">
      <div class="small" style="font-weight:600;margin:0 0 10px">Lager — brist / inköp</div>
      <div class="small">CAR‑CHG‑60W brist (4 st kvar)</div>
      <div class="small">LIGHT‑27W låg nivå</div>
      <hr class="sep">
      <div class="small">Schema (dag)</div>
      <div class="small">09:00 Orderplock (Jesper)</div>
      <div class="small">11:00 Kundmöte — Nordic</div>
      <div class="small">14:00 Inventarie (Lea)</div>
    </div>
  </div>`;

  const ctx = document.getElementById('revChart');
  if(window.Chart && ctx){
    const c = new Chart(ctx, {
      type:'bar',
      data:{labels:['Mån','Tis','Ons','Tors','Fre','Lör','Sön'],
        datasets:[
          {label:'Omsättning', data:[120,180,160,190,210,90,110]},
          {label:'Kostnader', data:[80,100,90,95,120,70,85]},
          {label:'GM%', data:[33,44,41,42,43,22,23]}
        ]
      },
      options:{responsive:true, plugins:{legend:{position:'bottom'}}}
    });
  }
};

App.routes['notfound'] = (el)=>{
  el.innerHTML = `<div class="panel" style="padding:18px">Sidan finns inte</div>`;
};
