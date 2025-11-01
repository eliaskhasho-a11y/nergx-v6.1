
function AutomationView(){
  const wrap=el('div','grid');
  const left=el('div','card');left.style.gridColumn='span 8';
  const right=el('div','card');right.style.gridColumn='span 4';
  left.innerHTML=`<h3>Automation & Workflow</h3>
  <div class="small">Dra block till flödet. Körning loggas i historik.</div>
  <div style="margin-top:8px">
    <div class="small">Block</div>
    <div id="nodes" class="drag-bucket">
      <span class="node" draggable="true" data-type="trigger">Trigger: Ny order</span>
      <span class="node" draggable="true" data-type="ai">AI: Skapa sammanfattning</span>
      <span class="node" draggable="true" data-type="task">Uppgift: Tilldela säljare</span>
      <span class="node" draggable="true" data-type="notify">Notis: Slack/Email</span>
    </div>
    <div class="small" style="margin-top:8px">Flöde</div>
    <div id="flow" class="drag-bucket" style="min-height:140px"></div>
    <div class="row" style="margin-top:8px"><button class="btn" id="runFlow">Kör flöde</button><button class="btn ghost" id="clearFlow">Rensa</button></div>
  </div>`;
  right.innerHTML=`<h3>Historik</h3><div id="hist" class="small">–</div>`;
  function dropBox(b){b.addEventListener('dragover',e=>e.preventDefault());b.addEventListener('drop',e=>{const type=e.dataTransfer.getData('text/plain');const s=document.createElement('span');s.className='node';s.textContent=type;b.appendChild(s)})}
  dropBox(document.getElementById('flow'));
  document.querySelectorAll('#nodes .node').forEach(n=>n.addEventListener('dragstart',e=>e.dataTransfer.setData('text/plain',n.textContent)));
  document.getElementById('clearFlow').onclick=()=>document.getElementById('flow').innerHTML='';
  document.getElementById('runFlow').onclick=()=>{const steps=Array.from(document.querySelectorAll('#flow .node')).map(n=>n.textContent);const msg=steps.length?`Körde: ${steps.join(' → ')}`:'Inget i flödet';const hist=document.getElementById('hist');hist.innerHTML=(hist.innerHTML==='–'?'':hist.innerHTML+'<br>')+new Date().toLocaleTimeString()+' · '+msg;addNotif('Flow kördes','info')};
  wrap.append(left,right);return wrap;
}
