
function DashboardView(){
  const wrap=el('div','grid');
  const k1=el('div','card');k1.innerHTML=`<h3>Omsättning idag</h3><div class="kpi">324 500 kr</div><div class="small">+12 % mot igår</div>`;
  const k2=el('div','card');k2.innerHTML=`<h3>Order idag</h3><div class="kpi">71</div><div class="small">3 stora B2B</div>`;
  const k3=el('div','card');k3.innerHTML=`<h3>Bruttomarginal</h3><div class="kpi">62 %</div><div class="small">Stabil nivå</div>`;
  k1.style.gridColumn='span 4';k2.style.gridColumn='span 4';k3.style.gridColumn='span 4';wrap.append(k1,k2,k3);
  const econ=el('div','card');econ.style.gridColumn='span 12';econ.innerHTML=`<h3>Ekonomi — kombostaplar</h3><canvas id="ecoChart" height="90"></canvas>`;wrap.appendChild(econ);
  setTimeout(()=>{const ctx=document.getElementById('ecoChart');if(!ctx)return;new Chart(ctx,{type:'bar',data:{labels:['Mån','Tis','Ons','Tor','Fre','Lör','Sön'],datasets:[{label:'Oms',data:[325,280,420,300,260,180,320],backgroundColor:'rgba(91,140,255,.6)'},{label:'Kost',data:[110,120,140,130,90,60,120],backgroundColor:'rgba(52,211,153,.4)'},{label:'GM%',data:[62,58,64,60,63,59,61],type:'line',borderColor:'#f59e0b',tension:.3}]},options:{plugins:{legend:{labels:{color:'#cbd5e1'}}},scales:{x:{ticks:{color:'#9aa5b5'}},y:{ticks:{color:'#9aa5b5'}}}});},20);
  const sched=el('div','card');sched.style.gridColumn='span 6';sched.innerHTML=`<h3>Schema (dag)</h3><ul class="small" style="line-height:1.8"><li>09:00 Orderplock (Jesper)</li><li>11:00 Kundmöte — Nordic</li><li>14:00 Inventarie (Lea)</li></ul>`;
  const stock=el('div','card');stock.style.gridColumn='span 6';stock.innerHTML=`<h3>Lager — brist / inköp</h3><table class="table"><thead><tr><th>SKU</th><th>Produkt</th><th>Nivå</th><th>Status</th></tr></thead><tbody><tr><td>CAR-CHG-60W</td><td>Bil-laddare 60W</td><td>4</td><td><span class="chip">brist</span></td></tr><tr><td>LIGHT-27W</td><td>LED-lampa 27W</td><td>12</td><td><span class="chip">låg</span></td></tr></tbody></table>`;
  wrap.append(sched,stock);
  const map=el('div','card');map.style.gridColumn='span 12';map.innerHTML=`<h3>AI-Karta (teaser)</h3><div class="small">Mini-karta — full version i 7.3b</div><div id="miniMap" style="height:260px;margin-top:8px;border-radius:12px;overflow:hidden"></div>`;wrap.appendChild(map);
  setTimeout(()=>{if(window.L){const m=L.map('miniMap',{zoomControl:false}).setView([59.334,18.066],11);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OSM'}).addTo(m);L.marker([59.334,18.066]).addTo(m).bindPopup('Rek. besök: Stock Wireless kl. 13:00')}},20);
  return wrap;
}
