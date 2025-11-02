const Dashboard = {
  render(){
    return `
      <div class="grid">
        <div class="cards">
          <div class="card"><div class="hd">Omsättning idag</div>
            <div class="bd kpi"><b id="revNum">324 500 kr</b> <span class="muted">+12 % mot igår</span></div></div>
          <div class="card"><div class="hd">Order idag</div>
            <div class="bd kpi"><b>71</b> <span class="muted">3 stora B2B</span></div></div>
          <div class="card"><div class="hd">Bruttomarginal</div>
            <div class="bd kpi"><b>62 %</b> <span class="muted">Stabil nivå</span></div></div>
        </div>

        <div class="card">
          <div class="hd">Ekonomi — kombostaplar</div>
          <div class="bd"><canvas id="ecoChart" height="120"></canvas></div>
        </div>

        <div class="grid" style="grid-template-columns: 1.1fr .9fr; gap:16px">
          <div class="card">
            <div class="hd">Schema (dag)</div>
            <div class="bd list">
              <div class="row"><span>09:00 Orderplock (Jesper)</span></div>
              <div class="row"><span>11:00 Kundmöte — Nordic</span></div>
              <div class="row"><span>14:00 Inventarie (Lea)</span></div>
            </div>
          </div>

          <div class="card">
            <div class="hd">Lager — brist / inköp</div>
            <div class="bd list">
              <div class="row"><span>CAR-CHG-60W</span><span class="muted">4 kvar</span><b class="tag">brist</b></div>
              <div class="row"><span>LIGHT-27W</span><span class="muted">12 kvar</span><b class="tag" style="background:rgba(245,158,11,.12); color:#92400e">låg</b></div>
            </div>
          </div>
        </div>
      </div>
    `;
  },
  afterRender(){
    const ctx = document.getElementById('ecoChart');
    new Chart(ctx, {
      type:'bar',
      data:{
        labels:['Mån', 'Tis', 'Ons', 'Tors', 'Fre', 'Lör', 'Sön'],
        datasets:[
          {label:'Omsättning', backgroundColor:'#3b82f6', data:[120,140,130,150,170,160,155]},
          {label:'Kostnader', backgroundColor:'#22c55e', data:[70,65,80,75,90,85,82]},
          {label:'GM%', type:'line', borderColor:'#8b5cf6', backgroundColor:'transparent', data:[35,38,36,37,39,38,40]}
        ]
      },
      options:{responsive:true, maintainAspectRatio:false, height:120}
    });
  }
};
