
import { formatSEK } from '../state.js';
export function renderEconomy(v){
  v.innerHTML=`<div class="card"><h3>Ekonomi & budget</h3><div class="muted">Realtidsrapportering (mock)</div><canvas id="ecoChart" height="110"></canvas></div>`;
  const ctx=document.getElementById('ecoChart');
  if(window.Chart){ new Chart(ctx,{type:'line',data:{labels:["v1","v2","v3","v4"],datasets:[{label:"Omsättning",data:[160,180,200,230],borderColor:"#4f46e5",tension:.35},{label:"Kostnader",data:[110,120,130,145],borderColor:"#ef4444",tension:.35}]},options:{responsive:true}}); }
}
