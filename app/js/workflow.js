
const Flow = {
  nodes: [],
  render(){
    const v=document.getElementById('view');
    v.innerHTML = `<div class="grid">
      <div class="card">
        <div class="hd">Automation — Workflow (beta)</div>
        <div class="bd">
          <div class="toolbar">
            <button class="btn" id="addTrig">+ Trigger</button>
            <button class="btn" id="addAct">+ Action</button>
            <button class="btn brand" id="saveFlow">Spara</button>
          </div>
          <div id="flow" class="flow-stage"></div>
          <div style="margin-top:10px">
            <div class="smallmuted">JSON</div>
            <pre id="flowJson" class="codebox">{}</pre>
          </div>
        </div>
      </div>
    </div>`;
    const stage=document.getElementById('flow');
    const mk=(label)=>{
      const n={ id: Date.now()+Math.random(), x: 40+Math.random()*260, y: 40+Math.random()*160, label};
      this.nodes.push(n);
      const el=document.createElement('div'); el.className='node'; el.style.left=n.x+'px'; el.style.top=n.y+'px'; el.textContent=label; el.dataset.id=n.id;
      stage.appendChild(el);
      // drag
      let drag=false, dx=0,dy=0;
      el.addEventListener('mousedown', e=>{ drag=true; dx=e.offsetX; dy=e.offsetY; el.style.cursor='grabbing'; });
      window.addEventListener('mousemove', e=>{
        if(!drag) return;
        const rect=stage.getBoundingClientRect();
        n.x = e.clientX - rect.left - dx; n.y = e.clientY - rect.top - dy;
        el.style.left=n.x+'px'; el.style.top=n.y+'px';
      });
      window.addEventListener('mouseup', ()=>{ drag=false; el.style.cursor='grab'; });
    };
    document.getElementById('addTrig').onclick=()=>mk('Trigger: Ny order');
    document.getElementById('addAct').onclick=()=>mk('Action: Skicka e‑post');
    document.getElementById('saveFlow').onclick=()=>{
      document.getElementById('flowJson').textContent = JSON.stringify(this.nodes, null, 2);
      Notis.push('Workflow sparad ('+this.nodes.length+' noder)');
    };
  }
};
