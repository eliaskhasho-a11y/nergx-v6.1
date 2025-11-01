
const Economy = {
  render(){
    const v=document.getElementById('view');
    v.innerHTML = `<div class="grid">
      <div class="card"><div class="hd">Ekonomi & Budget</div>
      <div class="bd">
        <p>Plats för AI-baserad prognos, graf och budget-scenarier. Kommer i v7.4.</p>
        <div class="codebox">{ "forecast": { "revenue_next_30d": "+8.2%", "gm_trend": "stabil" } }</div>
      </div></div>
    </div>`;
  }
};
