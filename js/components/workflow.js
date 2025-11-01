
MX.register('workflow', el => {
  el.innerHTML = `
    <div class="header"><div style="font-weight:700">Automation</div>
      <div class="flex"><button id="addT">+ Trigger</button><button id="addA">+ Action</button><button id="save">Spara</button><button id="load">Läs in</button></div></div>
    <div class="card"><div id="wf" class="workflow"></div></div>
  `;
  const wf=el.querySelector('#wf');
  function node(title,x,y){ const n=document.createElement('div'); n.className='node'; n.style.left=x+'px'; n.style.top=y+'px'; n.innerHTML='<div class="small">'+title+'</div><input placeholder="param…" style="width:100%;margin-top:6px"/>'; 
    let drag=false,dx=0,dy=0; n.addEventListener('pointerdown',e=>{drag=true;n.setPointerCapture(e.pointerId);dx=e.offsetX;dy=e.offsetY});
    n.addEventListener('pointermove',e=>{ if(drag){ n.style.left=(e.offsetX-dx)+'px'; n.style.top=(e.offsetY-dy)+'px'; }});
    n.addEventListener('pointerup',()=>drag=false); wf.appendChild(n); return n; }
  function serialize(){ const nodes=[...wf.querySelectorAll('.node')].map(n=>({title:n.querySelector('.small').textContent,x:+n.style.left.replace('px',''),y:+n.style.top.replace('px',''),param:n.querySelector('input').value})); return {nodes}; }
  function restore(d){ wf.innerHTML=''; (d.nodes||[]).forEach(n=>{ const nn=node(n.title,n.x,n.y); nn.querySelector('input').value=n.param||''; }); }
  el.querySelector('#addT').onclick = ()=> node('Trigger: Ny order',40+Math.random()*120,40+Math.random()*100);
  el.querySelector('#addA').onclick = ()=> node('Action: Skicka e-post',240+Math.random()*160,200+Math.random()*120);
  el.querySelector('#save').onclick = ()=>{ MX.workflows=[serialize()]; MX.save(); MX.pushAudit({type:'wf.save', actor:MX.role}); alert('Flöde sparat'); };
  el.querySelector('#load').onclick = ()=>{ const d=MX.workflows[0]; d?restore(d):alert('Inget sparat flöde'); };
  node('Trigger: Ny kund',40,60); node('Action: Skapa onboarding',280,220);
});
