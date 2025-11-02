
(function(){
  function setActive(){
    document.querySelectorAll('[data-nav]').forEach(a=>{
      a.classList.toggle('active', a.getAttribute('href') === location.hash);
    })
  }
  window.addEventListener('hashchange', ()=>{ setActive(); Router.route() });
  window.addEventListener('DOMContentLoaded', ()=>{
    if(!location.hash) location.hash = '#/dashboard';
    setActive();
    Router.route();
    Coach.init();
    Notis.init();
  });
})();
