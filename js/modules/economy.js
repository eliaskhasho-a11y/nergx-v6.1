export function economyView(el, State){
  el.innerHTML = `<div class="card"><h2>Ekonomi & Budget</h2>
  <p>Realtidsrapportering & AI‑prognos (mock).</p>
  <ul class="small">
    <li>Omsättning YTD: ${Intl.NumberFormat('sv-SE').format(4823540)} kr</li>
    <li>Prognos Q4: ${Intl.NumberFormat('sv-SE').format(State.kpi.revenue*60)} kr</li>
  </ul></div>`;
}
