
import { el, clear } from '../utils/dom.js';

export const View = (root)=>{
  clear(root);
  root.append(
    el('div',{className:'card'},
      el('div',{style:'font-weight:700;margin-bottom:8px'}, 'Inställningar'),
      el('div',{}, 'Tema & Språk styrs från sidomenyn.'),
      el('div',{style:'margin-top:8px'}, 'API-nycklar (mock): OpenAI, frakt, finans.'),
      el('div',{style:'margin-top:8px'}, 'Behörigheter: ge roller till Personal, Ekonomi, Admin (mock).')
    )
  );
};
