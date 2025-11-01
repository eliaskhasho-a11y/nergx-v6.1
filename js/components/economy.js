
MX.register('economy', el => {
  el.innerHTML = `
    <div class="grid">
      <div class="header"><div style="font-weight:700">Ekonomi / Budget</div></div>
      <div class="row">
        <div class="card">
          <div class="small">Budget (månad)</div><input id="b" type="number" value="320000" style="width:180px"/>
          <div class="small">Kostnader (månad)</div><input id="c" type="number" value="110000" style="width:180px"/>
          <div class="small">Omsättning hittills</div><input id="r" type="number" value="${MX.kpi.revenue}" style="width:180px"/>
          <div style="margin-top:10px"><button id="calc">Beräkna prognos</button></div>
        </div>
        <div class="card">
          <div class="small">Prognos</div><div id="o" class="kpi">–</div>
        </div>
      </div>
    </div>
  `;
  const b=el.querySelector('#b'), c=el.querySelector('#c'), r=el.querySelector('#r'), o=el.querySelector('#o');
  function calc(){ const profit=(+r.value)-(+c.value); const pct=Math.round(Math.min(1,Math.max(0,profit/(+b.value)))*100); o.textContent=profit.toLocaleString('sv-SE')+' kr | '+pct+' % mot budget'; }
  calc(); el.querySelector('#calc').onclick = calc;
});
