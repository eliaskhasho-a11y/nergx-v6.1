
const CRM = {
  key:'mergx_crm',
  get(){ return JSON.parse(localStorage.getItem(this.key)||'[]'); },
  set(v){ localStorage.setItem(this.key, JSON.stringify(v)); },
  add(item){ const list=this.get(); list.push(Object.assign({id:Date.now()},item)); this.set(list); },
  del(id){ const list=this.get().filter(x=>x.id!==id); this.set(list); },
  edit(id, patch){ const list=this.get().map(x=> x.id===id?Object.assign({},x,patch):x); this.set(list); },
  render(){
    const v=document.getElementById('view');
    v.innerHTML = `
    <div class="grid">
      <div class="card">
        <div class="hd">Ny kund</div>
        <div class="bd">
          <div class="row">
            <div class="col-4"><input id="cName" class="input" placeholder="Företagsnamn / Namn"/></div>
            <div class="col-4"><input id="cEmail" class="input" placeholder="E‑post"/></div>
            <div class="col-4"><input id="cPhone" class="input" placeholder="Telefon"/></div>
          </div>
          <div class="toolbar" style="margin-top:10px"><button class="btn brand" id="saveBtn">Spara kund</button></div>
        </div>
      </div>
      <div class="card">
        <div class="hd">Kundlista</div>
        <div class="bd">
          <table class="table" id="crmTbl">
            <thead><tr><th>Namn</th><th>E-post</th><th>Telefon</th><th></th></tr></thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>`;
    document.getElementById('saveBtn').onclick=()=>{
      const nm=document.getElementById('cName').value.trim();
      const em=document.getElementById('cEmail').value.trim();
      const ph=document.getElementById('cPhone').value.trim();
      if(!nm) return alert('Namn saknas');
      this.add({name:nm,email:em,phone:ph}); this.paint();
      Notis.push(`Kund "${nm}" skapades`);
    };
    this.paint();
  },
  paint(){
    const tbody = document.querySelector('#crmTbl tbody');
    const list=this.get();
    tbody.innerHTML = list.map(x=>`<tr>
      <td contenteditable="true" onblur="CRM.edit(${x.id},{name:this.innerText})">${x.name||''}</td>
      <td contenteditable="true" onblur="CRM.edit(${x.id},{email:this.innerText})">${x.email||''}</td>
      <td contenteditable="true" onblur="CRM.edit(${x.id},{phone:this.innerText})">${x.phone||''}</td>
      <td><button class="btn" onclick="CRM.del(${x.id});CRM.paint()">Ta bort</button></td>
    </tr>`).join('');
  }
};
