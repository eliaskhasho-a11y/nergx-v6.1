
window.App = { state:{ notes:[], coach:[] }, routes:{} };

function setActive(route){
  document.querySelectorAll('#nav a').forEach(a=>{
    a.classList.toggle('active', a.dataset.route===route);
  });
}
function render(route){
  setActive(route);
  const target = document.getElementById('view');
  const fn = App.routes[route] || App.routes['notfound'];
  target.innerHTML = '';
  fn(target);
}

window.addEventListener('hashchange', ()=>{
  const route = location.hash.replace('#/','') || 'dashboard';
  render(route);
});

document.addEventListener('DOMContentLoaded', ()=>{
  if(!location.hash) location.hash = '#/dashboard';
  render(location.hash.replace('#/',''));
});
