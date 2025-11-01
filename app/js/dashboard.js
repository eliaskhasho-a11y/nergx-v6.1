
const Dashboard = {
  render(){
    const v=document.getElementById('view');
    v.innerHTML = `
    <div class="grid kpis">
      <div class="card"><div class="bd"><div class="sub">Omsättning idag</div><div class="kpi" id="kpiRevenue">324 500 kr</div><div class="smallmuted">+12% mot igår</div></div></div>
      <div class="card"><div class="bd"><div class="sub">Order idag</div><div class="kpi">71</div><div class="smallmuted">3 stora B2B</div></div></div>
      <div class="card"><div class="bd"><div class="sub">Bruttomarginal</div><div class="kpi">62 %</div><div class="smallmuted">Stabil nivå</div></div></div>
    </div>
    <div class="grid" style="grid-template-columns: 1fr;">
      <div class="card">
        <div class="hd">Ekonomi — kombo-graf</div>
        <div class="bd"><canvas id="ecoChart" class="canvas" width="1200" height="220"></canvas></div>
      </div>
    </div>
    <div class="row">
      <div class="card col-8">
        <div class="hd">Schema (dag)</div>
        <div class="bd">
          <ul>
            <li>09:00 Orderplock (Jesper)</li>
            <li>11:00 Kundmöte — Nordic</li>
            <li>14:00 Inventarie (Lea)</li>
          </ul>
        </div>
      </div>
      <div class="card col-4">
        <div class="hd">Lager — brist / inköp</div>
        <div class="bd">
          <table class="table">
            <thead><tr><th>SKU</th><th>Produkt</th><th>Nivå</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>CAR-CHG-60W</td><td>Bil-laddare 60W</td><td>4</td><td><span class="badge">brist</span></td></tr>
              <tr><td>LIGHT-27W</td><td>LED-lampa 27W</td><td>12</td><td><span class="badge">låg</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card col-8">
        <div class="hd">AI-Karta (mini)</div>
        <div class="bd"><div id="mapCanvas" style="position:relative;"></div></div>
      </div>
      <div class="card col-4">
        <div class="hd">Notiser</div>
        <div class="bd"><div id="notisList"></div></div>
      </div>
    </div>
    <div class="row">
      <div class="card col-8">
        <div class="hd">AI Coach</div>
        <div class="bd">
          <div id="coachLog" style="height:180px;overflow:auto;border:1px solid var(--border);border-radius:12px;padding:10px"></div>
          <div class="toolbar"><input id="coachInput" class="input" placeholder="Skriv ett meddelande… (Enter för att skicka)"/></div>
        </div>
      </div>
      <div class="col-4"></div>
    </div>`;

    // chart
    this.drawEcoChart();
    // notis
    Notis.renderList('notisList');
    // map
    AIMap.mini('mapCanvas');
    // coach
    Coach.bind('coachInput','coachLog');
  },
  drawEcoChart(){
    const c=document.getElementById('ecoChart'); const ctx=c.getContext('2d');
    // Simple axes
    ctx.clearRect(0,0,c.width,c.height);
    ctx.strokeStyle = '#e5e7eb'; ctx.beginPath(); for(let y=30;y<c.height;y+=38){ctx.moveTo(40,y);ctx.lineTo(c.width-20,y);} ctx.stroke();
    // Data
    const sales=[220,240,260,255,280,310,330,320,340,355,370,395];
    const costs=[160,170,180,185,190,210,215,220,230,240,250,260];
    const gm = sales.map((s,i)=> Math.round((1-costs[i]/s)*100));
    const mapLine=(arr,color,offset=0)=>{
      const max=400;
      ctx.beginPath(); ctx.strokeStyle=color; ctx.lineWidth=2;
      arr.forEach((v,i)=>{
        const x = 40 + i*((c.width-80)/ (arr.length-1));
        const y = c.height-20 - (v/max)*(c.height-60);
        if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      });
      ctx.stroke();
    };
    mapLine(sales,'#2563eb');
    mapLine(costs,'#16a34a');
    // GM as dots
    gm.forEach((v,i)=>{
      const x = 40 + i*((c.width-80)/ (gm.length-1));
      const y = c.height-20 - (v/100)*(c.height-60);
      ctx.fillStyle='#a855f7'; ctx.beginPath(); ctx.arc(x,y,3,0,Math.PI*2); ctx.fill();
    });
  }
};
