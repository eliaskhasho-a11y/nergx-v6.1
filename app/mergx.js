const State={theme:'light',route:'dashboard',kpi:{revenue:324500,orders:71,gm:0.62}};
const $=(s,c=document)=>c.querySelector(s);const $$=(s,c=document)=>[...c.querySelectorAll(s)];
const money=v=>new Intl.NumberFormat('sv-SE').format(v)+' kr';
function notify(t){const b=$('#notis');b.textContent=t;b.classList.add('show');setTimeout(()=>b.classList.remove('show'),2000);}
function route(){const h=location.hash.replace(/^#\/?/,'');State.route=h||'dashboard';render();}
function render(){let html='';if(State.route==='dashboard'){html=`<h2>Dashboard</h2><p>Omsättning: ${money(State.kpi.revenue)}</p>`;}else if(State.route==='crm'){html='<h2>CRM</h2><p>Kundlista placeholder</p>';}else{html='<h2>Inställningar</h2>';}$('#app').innerHTML=html;$$('#nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('data-route')===State.route));}
$('#themeSel').addEventListener('change',e=>{State.theme=e.target.value;document.body.style.background=State.theme==='dark'?'#111827':'#f6f8fb';});
window.addEventListener('hashchange',route);route();