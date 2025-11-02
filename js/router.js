// Simple hash router with safe defaults
export const Router = {
  routes: new Map(),
  mount(el){
    this.el = el;
    window.addEventListener('hashchange', ()=>this.render());
    window.addEventListener('load', ()=>{
      if(!location.hash || location.hash === '#/') location.hash = '#/dashboard';
      this.render();
    });
  },
  register(path, render){ this.routes.set(path, render); },
  render(){
    const path = location.hash.replace(/^#/, '');
    const view = this.el;
    const fn = this.routes.get(path) || this.routes.get('/404');
    view.innerHTML = '';
    fn?.(view);
    document.querySelectorAll('[data-route]').forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href')===location.hash);
    });
  }
}
