
App.routes['automation'] = (el)=>{
  el.innerHTML = `<div class="panel" style="padding:16px">
    <div class="small" style="font-weight:600;margin-bottom:10px">Automation (drag/drop – mock)</div>
    <div class="canvas" id="canvas" style="position:relative"></div>
    <div class="small" style="margin-top:10px">Tips: dra noderna. Flöde: Trigger → Villkor → Åtgärd.</div>
  </div>`;

  const c = document.getElementById('canvas');
  const nodes = [
    {x:40,y:60,title:'Trigger',desc:'Ny order skapad'},
    {x:260,y:180,title:'Villkor',desc:'Ordervärde > 2000 kr'},
    {x:520,y:260,title:'Åtgärd',desc:'Skicka Slack + Skapa faktura'}
  ];

  nodes.forEach(n=>{
    const eln = document.createElement('div');
    eln.className='node'; eln.style.left=n.x+'px'; eln.style.top=n.y+'px';
    eln.innerHTML=`<h5>${n.title}</h5><div class='small'>${n.desc}</div><div class='connector'></div>`;
    c.appendChild(eln);
    let sx,sy,ox,oy,drag=false;
    eln.addEventListener('pointerdown',e=>{drag=true; sx=e.clientX; sy=e.clientY; ox=eln.offsetLeft; oy=eln.offsetTop; eln.setPointerCapture(e.pointerId)});
    eln.addEventListener('pointermove',e=>{ if(!drag) return; eln.style.left=(ox+e.clientX-sx)+'px'; eln.style.top=(oy+e.clientY-sy)+'px'; });
    eln.addEventListener('pointerup',()=>drag=false);
  });
};
