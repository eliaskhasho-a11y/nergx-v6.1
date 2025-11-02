
const Router = {
  routes: {},
  mount(id, fn){ this.routes[id] = fn },
  route(){
    const hash = (location.hash || '#/dashboard').replace('#/','');
    const view = document.getElementById('app');
    const fn = this.routes[hash];
    view.innerHTML = fn ? fn() : `<div class="card"><h2>Sidan finns inte</h2></div>`;
    if(window.__hydrate) window.__hydrate(hash);
  }
};
