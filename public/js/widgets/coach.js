
import { $, el } from '../utils/dom.js';
import { dt } from '../utils/format.js';
import { pushNotis } from './notify.js';
let inited=false;
export const coachInit = ()=>{
  if(inited) return; inited=true;
  const feed = $('#coachFeed');
  const push = (txt, who='AI') => {
    feed.append(el('div',{className:'msg'}, `[${who}] `+txt, ' ', el('small',{style:'opacity:.6'}, dt(Date.now())) ));
    feed.scrollTop = feed.scrollHeight;
  };
  $('#coachSend').addEventListener('click', ()=>{
    const v=$('#coachInput').value.trim(); if(!v) return;
    $('#coachInput').value=''; push(v,'Du');
    setTimeout(()=> { push('Mock-svar: "'+v+'" bearbetad. Rek: följ upp topp-3 kunder.'); pushNotis('AI coach svarade'); }, 600);
  });
  push('Hej! Jag är din AI-coach. Bevakar KPI:er, lager, deadlines. Skriv vad du vill ha hjälp med.');
};
