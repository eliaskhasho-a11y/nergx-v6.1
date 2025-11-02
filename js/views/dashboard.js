
import { State, formatSEK } from '../state.js';
export function renderDashboard(v){
  v.innerHTML=`
  <div class="row cols-3">
    <div class="card kpi"><div class="label">Omsättning idag</div><div class="value">${formatSEK(State.kpi.revenueToday)}</div><div class="delta">+${(State.kpi.deltaRevenue*100).toFixed(0)} % mot igår</div></div>
    <div class="card kpi"><div class="label">Order idag</div><div class="value">${State.kpi.ordersToday}</div><div class="muted">3 stora B2B</div></div>
    <div class="card kpi"><div class="label">Bruttomarginal</div><div class="value">${(State.kpi.margin*100).toFixed(0)} %</div><div class="muted">Stabil nivå</div></div>
  </div>
  <div class="row cols-1" style="margin-top:12px">
    <div class="card"><div class="muted" style="font-size:13px">Ekonomi — kombostaplar</div><canvas id="comboChart" height="82"></canvas></div>
  </div>
  <div class="row cols-2" style="margin-top:12px">
    <div class="card"><h3>Schema (dag)</h3><ul class="muted"><li>09:00 Orderplock (Jesper)</li><li>11:00 Kundmöte — Nordic</li><li>14:00 Inventarie (Lea)</li></ul></div>
    <div class="card"><h3>Lager — brist / inköp</h3><table class="table"><thead><tr><th>SKU</th><th>Produkt</th><th>Nivå</th><th>Status</th></tr></thead><tbody>${
      State.inventory.map(x=>`<tr><td>${x.sku}</td><td>${x.name}</td><td>${x.stock}</td><td><span class="badge">${x.status}</span></td></tr>`).join('')
    }</tbody></table></div>
  </div>
  <div class="row cols-2" style="margin-top:12px">
    <div class="card"><h3>Notiser</h3><ul class="muted" id="notifList">${State.notifications.map(n=>`<li>${n}</li>`).join('')}</ul></div>
    <div class="card">
      <h3>AI-Coach</h3>
      <div class="chatbox" id="coachBox"></div>
      <div class="inputRow"><input id="coachInput" placeholder="Skriv ett meddelande... (Enter för att skicka)"/><button class="btn" id="coachSend">Skicka</button></div>
      <div class="muted" style="font-size:12px">Kontext: KPI, lager, budget</div>
    </div>
  </div>`;
  const ctx=document.getElementById('comboChart');
  if(window.Chart){ new Chart(ctx,{type:'bar',data:{labels:['Mån','Tis','Ons','Tor','Fre','Lör','Sön'],datasets:[
    {label:'Omsättning',data:[250,260,300,290,324,280,310],backgroundColor:'#93c5fd'},
    {label:'Kostnader',data:[180,175,190,200,210,190,205],backgroundColor:'#fecaca'},
    {label:'GM%',data:[0.28,0.32,0.36,0.34,0.38,0.33,0.35],type:'line',yAxisID:'y1',borderColor:'#22c55e',tension:.3}
  ]},options:{responsive:true,scales:{y:{beginAtZero:true},y1:{beginAtZero:true,min:0,max:1,ticks:{callback:(v)=>(v*100)+'%'}}}}); }
  const box=document.getElementById('coachBox'); const inp=document.getElementById('coachInput'); const btn=document.getElementById('coachSend');
  function msg(who,text){ const d=document.createElement('div'); d.className='msg'+(who==='ME'?' me':''); d.textContent=text; return d; }
  box.append(msg('AI','Hej! Jag är din AI-coach. Jag bevakar KPI:er, lager och deadlines. Säg vad du vill ha hjälp med.'));
  function reply(q){ const s=q.toLowerCase(); if(s.includes('budget'))return 'Prognos: Omsättning +6–9% kommande 30 dagar.'; if(s.includes('lager'))return 'Föreslår inköp: CAR-CHG-60W (mål 50 st).'; if(s.includes('crm')||s.includes('kund'))return 'CRM: Kontakta Stock Wireless 13–15 idag.'; return 'Noterat. Vill du skapa automation för detta eller lägga i dagens att-göra?'; }
  function send(){ const v=inp.value.trim(); if(!v)return; box.append(msg('ME',v)); inp.value=''; setTimeout(()=>{ box.append(msg('AI',reply(v))); box.scrollTop=box.scrollHeight; },350); }
  btn.addEventListener('click',send); inp.addEventListener('keydown',(e)=>{ if(e.key==='Enter'){ e.preventDefault(); send(); }});
}
