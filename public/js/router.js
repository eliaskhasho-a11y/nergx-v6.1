
import { $, el, clear } from './utils/dom.js';
import { Dashboard } from './ui/dashboard.js';
import * as CRM from './ui/crm.js';
import * as INV from './ui/inventory.js';
import * as ORD from './ui/orders.js';
import * as FIL from './ui/files.js';
import * as CHT from './ui/chat.js';
import * as SET from './ui/settings.js';

const routes = {
  '#/dashboard': Dashboard,
  '#/crm': (root)=>CRM.View(root),
  '#/inventory': (root)=>INV.View(root),
  '#/orders': (root)=>ORD.View(root),
  '#/files': (root)=>FIL.View(root),
  '#/chat': (root)=>CHT.View(root),
  '#/settings': (root)=>SET.View(root),
};

export const mountNav = ()=>{
  const nav = $('#nav'); clear(nav);
  const items = [
    ['#/dashboard','Översikt'],
    ['#/crm','Kunder / CRM'],
    ['#/inventory','Produkter / Lager'],
    ['#/orders','Order / Faktura'],
    ['#/files','Filer / OCR'],
    ['#/chat','Chatt'],
    ['#/settings','Inställningar'],
  ];
  for(const [href, txt] of items){
    const a = el('a',{href}, txt);
    if(location.hash===href || (location.hash===''&&href==='#/dashboard')) a.classList.add('active');
    nav.append(a);
  }
};

export const route = ()=>{
  const key = location.hash || '#/dashboard';
  const view = routes[key] || routes['#/dashboard'];
  const root = document.querySelector('#app'); clear(root);
  document.querySelector('#pageTitle').textContent = ({
    '#/dashboard':'Översikt',
    '#/crm':'Kunder / CRM',
    '#/inventory':'Produkter / Lager',
    '#/orders':'Order / Faktura',
    '#/files':'Filer / OCR',
    '#/chat':'Chatt',
    '#/settings':'Inställningar'
  })[key] || 'Översikt';
  // show "Skapa order" button on orders
  document.querySelector('#createOrderBtn').style.display = (key==='#/orders') ? 'inline-block' : 'none';
  view(root);
  mountNav();
};
