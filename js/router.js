
MX.routes = {};
MX.register = (name, render) => MX.routes[name] = render;

MX.allowedRoutesByRole = {
  'Admin'     : ['dashboard','business','crm','economy','document','workflow','map','audit','settings'],
  'Ekonomi'   : ['dashboard','business','economy','document','audit','settings'],
  'Sälj'      : ['dashboard','business','crm','document','map','settings'],
  'Lager'     : ['dashboard','document','map','settings'],
  'Kundtjänst': ['dashboard','business','crm','settings']
};

MX.buildNav = () => {
  const nav = document.getElementById('nav');
  const routes = MX.allowedRoutesByRole[MX.role] || [];
  const labels = {
    dashboard:'Översikt', business:'Affärssidor', crm:'Kunder / CRM', economy:'Ekonomi / Budget',
    document:'Dokumentflöde', workflow:'Automation', map:'AI-Karta', audit:'Audit-logg', settings:'Inställningar'
  };
  nav.innerHTML = routes.map(r=>`<a href="#/${r}" data-route="${r}">${labels[r]}</a>`).join('');
};

MX.start = () => {
  function route(){
    const r = location.hash.replace('#/','') || 'dashboard';
    MX.buildNav();
    document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('active', a.dataset.route===r));
    (MX.routes[r]||MX.routes['dashboard'])(document.getElementById('main'));
  }
  window.addEventListener('hashchange', route);
  route();
};
