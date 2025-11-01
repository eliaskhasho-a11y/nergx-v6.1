
const AIMap = {
  dataset:[
    {name:'Stock Wireless', x:60, y:120, value:82},
    {name:'Nordic Mobile', x:220, y:90, value:67},
    {name:'City Repair', x:360, y:160, value:45},
  ],
  mini(id){
    const host = document.getElementById(id);
    host.innerHTML='';
    host.style.position='relative';
    // draw markers
    this.dataset.forEach(p=>{
      const m=document.createElement('div'); m.className='marker';
      m.style.left = p.x+'px'; m.style.top = p.y+'px'; m.title = `${p.name} • score ${p.value}`;
      host.appendChild(m);
    });
  },
  render(){
    const v=document.getElementById('view');
    v.innerHTML = `<div class="grid">
      <div class="card">
        <div class="hd">AI‑Karta — Prospekt & Rek</div>
        <div class="bd">
          <div class="toolbar">
            <button class="btn" id="zoomIn">Zoom +</button>
            <button class="btn" id="zoomOut">Zoom −</button>
            <button class="btn" id="fit">Återställ</button>
          </div>
          <div id="mapStage" class="flow-stage" style="height:420px;background:repeating-linear-gradient(0deg,#f8fafc,#f8fafc 24px,#eef2ff 25px)"></div>
          <div class="smallmuted" style="margin-top:8px">Offline-läge: förenklad karta utan tiles. Leaflet/tiles kan aktiveras senare.</div>
        </div>
      </div>
    </div>`;
    const stage=document.getElementById('mapStage');
    let scale=1, offset={x:0,y:0}, dragging=false, start={x:0,y:0}, baseOffset={x:0,y:0};
    const draw=()=>{
      stage.style.transform = `translate(${offset.x}px, ${offset.y}px) scale(${scale})`;
      stage.style.transformOrigin='0 0';
      // remove old
      stage.querySelectorAll('.marker').forEach(m=>m.remove());
      // draw markers
      this.dataset.forEach(p=>{
        const m=document.createElement('div'); m.className='marker';
        m.style.left = p.x+'px'; m.style.top = p.y+'px'; m.title = `${p.name} • score ${p.value}`;
        stage.appendChild(m);
      });
    };
    draw();
    stage.addEventListener('mousedown', (e)=>{dragging=true; start={x:e.clientX,y:e.clientY}; baseOffset={...offset}; stage.style.cursor='grabbing';});
    window.addEventListener('mousemove', (e)=>{ if(!dragging) return; offset.x = baseOffset.x + (e.clientX-start.x); offset.y = baseOffset.y + (e.clientY-start.y); draw(); });
    window.addEventListener('mouseup', ()=>{dragging=false; stage.style.cursor='default'});
    document.getElementById('zoomIn').onclick=()=>{scale=Math.min(2, scale+0.1); draw();};
    document.getElementById('zoomOut').onclick=()=>{scale=Math.max(0.6, scale-0.1); draw();};
    document.getElementById('fit').onclick=()=>{scale=1; offset={x:0,y:0}; draw();};
  }
};
