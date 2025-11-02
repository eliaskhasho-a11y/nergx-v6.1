const Economy = {
  render(){
    return `
      <div class="grid" style="grid-template-columns: 1fr 1fr; gap:16px">
        <div class="card"><div class="hd">Ekonomi / Budget</div>
          <div class="bd"><canvas id="eco2" height="160"></canvas></div>
        </div>
        <div class="card"><div class="hd">AI-rekommendation</div>
          <div class="bd">
            <p class="muted">AI (mock): Rekommenderar 10% ökad budget i Region Syd kommande 30 dagar baserat på säljtempo.</p>
          </div>
        </div>
      </div>
    `;
  },
  afterRender(){
    const ctx = document.getElementById('eco2');
    if(!ctx) return;
    new Chart(ctx, {
      type:'line',
      data:{
        labels:['v40','v41','v42','v43','v44','v45','v46'],
        datasets:[
          {label:'Omsättning', borderColor:'#3b82f6', data:[120,140,138,150,160,162,175]},
          {label:'Kostnader', borderColor:'#ef4444', data:[80,82,85,90,92,95,96]}
        ]
      }, options:{responsive:true, maintainAspectRatio:false}
    });
  }
};
