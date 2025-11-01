
MX.register('map', el => {
  el.innerHTML = `
    <div class="header"><div style="font-weight:700">AI-Karta</div><div class="flex"><button id="save">Spara</button></div></div>
    <div class="card"><div class="map" id="m"></div></div>
  `;
  const m=el.querySelector('#m');
  function add(p){ const d=document.createElement('div'); d.className='marker'; d.title=p.name||'punkt'; d.style.left=p.x+'px'; d.style.top=p.y+'px'; m.appendChild(d);
    let drag=false,dx=0,dy=0; d.addEventListener('pointerdown',e=>{drag=true;d.setPointerCapture(e.pointerId);dx=e.offsetX;dy=e.offsetY});
    d.addEventListener('pointermove',e=>{ if(drag){ d.style.left=(e.offsetX-dx)+'px'; d.style.top=(e.offsetY-dy)+'px'; }});
    d.addEventListener('pointerup',()=>drag=false);
  }
  MX.mapPoints.forEach(add);
  el.querySelector('#save').onclick = ()=>{
    MX.mapPoints = [...m.querySelectorAll('.marker')].map(d=>({x:parseInt(d.style.left), y:parseInt(d.style.top), name:d.title}));
    MX.save(); MX.pushAudit({type:'map.save', actor:MX.role}); alert('Karta sparad.');
  };
});
