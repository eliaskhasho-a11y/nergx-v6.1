
const Views = {
  dashboard: ()=>Dashboard.render(),
  crm: ()=>CRM.render(),
  economy: ()=>Economy.render(),
  map: ()=>AIMap.render(),
  workflow: ()=>Flow.render(),
  settings: ()=>{
    const v=document.getElementById('view');
    v.innerHTML=`<div class="grid" style="gap:16px">
      <div class="card"><div class="hd">Inställningar</div>
      <div class="bd">
        <div class="smallmuted">Språk</div>
        <div class="toolbar"><button class="btn">Svenska</button><button class="btn">Engelska</button></div>
        <div class="smallmuted">Tema</div>
        <div class="toolbar"><button class="btn">Ljust</button><button class="btn" disabled>Mörkt (kommer)</button></div>
      </div></div>
    </div>`;
  }
};

const Router = {
  init(){
    if(!location.hash) location.hash = '#/dashboard';
    window.addEventListener('hashchange', this.update.bind(this));
    this.update();
  },
  update(){
    const route = location.hash.replace('#/','');
    document.querySelectorAll('#nav a').forEach(a=>{
      a.classList.toggle('active', a.dataset.route===route);
    });
    (Views[route]||Views['dashboard'])();
  }
};
window.Router = Router;
