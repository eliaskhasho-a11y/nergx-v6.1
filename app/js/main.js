
// MergX v7.3b — main: router, state, init

window.MX = {
  state: {
    theme: "light",
    notis: [],
    ai: []
  },
  route(path){
    const r = path || location.hash || "#/dashboard";
    const view = document.querySelector("#view");
    document.querySelectorAll(".nav button, .tab").forEach(b=>{
      if(b.dataset.route === r) b.classList.add("active"); else b.classList.remove("active");
    });
    // render
    if(r.startsWith("#/dashboard")) MX.renderDashboard(view);
    else if(r.startsWith("#/crm")) MX.renderCRM(view);
    else if(r.startsWith("#/economy")) MX.renderEconomy(view);
    else if(r.startsWith("#/map")) MX.renderMap(view);
    else MX.renderDashboard(view);

    // default route fix
    if(!location.hash) location.hash = "#/dashboard";
  },
  pushNotis(txt){
    const n = { t: new Date(), txt };
    MX.state.notis.push(n);
    MX.renderNotis();
  },
  initUI(){
    // nav buttons
    document.querySelectorAll(".nav button, .tab").forEach(b=>{
      b.addEventListener("click", ()=>{
        location.hash = b.dataset.route;
      });
    });
    // hash routing
    window.addEventListener("hashchange", ()=>MX.route(location.hash));
    if(!location.hash) location.hash = "#/dashboard";
    MX.route(location.hash);
  }
};

document.addEventListener("DOMContentLoaded", ()=>{
  MX.initUI();
  MX.renderNotis();
  MX.initAI();
});
