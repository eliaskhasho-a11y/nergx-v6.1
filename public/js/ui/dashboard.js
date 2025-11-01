
import { State } from '../state.js';
import { el, clear } from '../utils/dom.js';
import { money, num } from '../utils/format.js';
import { bars } from '../widgets/charts.js';
import { miniMap } from '../widgets/map.js';

const card=(title, body, cls='')=> el('div',{className:'card '+cls}, el('div',{style:'font-weight:700;margin-bottom:6px'}, title), body);

export const Dashboard = (root)=>{
  clear(root);
  const g = el('div',{className:'grid'});
  // KPIs
  const c1 = card('Omsättning idag', el('div',{}, el('div',{className:'kpi mono'}, money(State.kpi.revenue)), el('small',{style:'color:var(--muted)'}, '+12 % mot igår')), 'col-4');
  const c2 = card('Order idag', el('div',{}, el('div',{className:'kpi mono'}, num(State.kpi.orders)), el('small',{style:'color:var(--muted)'}, '3 stora B2B')), 'col-4');
  const c3 = card('Bruttomarginal', el('div',{}, el('div',{className:'kpi mono'}, Math.round(State.kpi.gm*100)+' %'), el('small',{style:'color:var(--muted)'}, 'Stabil nivå')), 'col-4');
  g.append(c1,c2,c3);

  // Combo bars
  const comboBody = el('div',{}, el('small',{style:'color:var(--muted)'}, 'Visar Oms (blå), Kost (turkos), GM% (lila), Budget (grå).'), bars(State.bars));
  const combo = card('Ekonomi — kombostaplar', comboBody, 'col-12');
  combo.addEventListener('click', ()=>{
    const d = el('div',{style:'margin-top:10px'}, el('strong',{}, 'AI Ekonomianalys: '), 'Region Syd driver 38 % av oms. Rek: skala kampanj där.');
    comboBody.append(d);
    combo.classList.add('expanded');
    setTimeout(()=> combo.classList.remove('expanded'), 2000);
  });
  g.append(combo);

  const sched = card('Schema (dag)', el('div',{}, ...State.schedule.map(s=> el('div',{className:'row'}, el('div',{}, s.time), el('div',{}, s.txt)))), 'col-6');
  const stock = card('Lager — brist / inköp', el('div',{}, ...State.stock.map(s=> el('div',{className:'row'}, el('div',{}, s.sku), el('div',{}, `${s.level} st • min ${s.min} • köp ${s.buy}`)))), 'col-6');
  const mapC = card('AI-Karta', miniMap(), 'col-6');
  const files = card('Filer / Kvitton', el('div',{}, '3 kvitton väntar tolkning', el('div',{style:'margin-top:8px'}, el('button',{className:'primary'}, 'Ladda upp'))), 'col-6');

  g.append(sched, stock, mapC, files);
  root.append(g);
};
