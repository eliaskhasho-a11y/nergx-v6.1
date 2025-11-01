
import { el, clear } from '../utils/dom.js';

export const View = (root)=>{
  clear(root);
  const wrap = el('div',{className:'card'},
    el('div',{style:'font-weight:700;margin-bottom:8px'}, 'Chatt (intern)'),
    el('div',{style:'height:220px;background:var(--glass);border-radius:12px;margin-bottom:8px;padding:8px'}, 'Mock-kanal: Allmänt'),
    el('div',{className:'row'}, el('input',{style:'flex:1', placeholder:'Skriv ett meddelande…'}), el('button',{className:'primary'}, 'Skicka'))
  );
  root.append(wrap);
};
