
window.Router={routes:[
 {path:'#/dashboard',label:'Översikt',icon:'📊',view:DashboardView},
 {path:'#/crm',label:'Kunder / CRM',icon:'👥',view:CRMView},
 {path:'#/automation',label:'Automation',icon:'⚙️',view:AutomationView},
 {path:'#/chat',label:'Chatt',icon:'💬',view:ChatView},
 {path:'#/map',label:'AI-Karta',icon:'🗺️',view:MapView},
 {path:'#/settings',label:'Inställningar',icon:'⚙️',view:SettingsView},
],init(){const nav=document.getElementById('nav');nav.innerHTML='';this.routes.forEach(r=>{const a=document.createElement('a');a.href=r.path;a.innerHTML=`<span>${r.icon}</span><span>${r.label}</span>`;nav.appendChild(a)});addEventListener('hashchange',()=>this.render());if(!location.hash)location.hash='#/dashboard';this.render()},render(){const route=this.routes.find(r=>r.path===location.hash)||this.routes[0];document.querySelectorAll('.nav a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')===route.path));const app=document.getElementById('app');app.innerHTML='';app.appendChild(route.view())}};
function el(t,c,h){const n=document.createElement(t);if(c)n.className=c;if(h!==undefined)n.innerHTML=h;return n}
