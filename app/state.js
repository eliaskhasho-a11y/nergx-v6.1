export const State={theme:localStorage.getItem('theme')||'light',lang:localStorage.getItem('lang')||'sv',kpi:{revenue:324500,orders:71,gm:0.62},schedule:[{t:'09:00',txt:'Orderplock (Jesper)'},{t:'11:00',txt:'Kundmöte — Nordic'},{t:'14:00',txt:'Inventarie (Lea)'}],stock:[{sku:'CAR-CHG-60W',name:'Bil-laddare 60W',level:'brist',left:4},{sku:'LIGHT-27W',name:'LED-lampa 27W',level:'låg nivå',left:12}],notes:[],coach:[]};
const listeners=new Set();export const onChange=fn=>(listeners.add(fn),()=>listeners.delete(fn));const emit=()=>listeners.forEach(fn=>fn());
export const setTheme=v=>{document.documentElement.setAttribute('data-theme',v);localStorage.setItem('theme',v);State.theme=v;emit();};
export const setLang=v=>{localStorage.setItem('lang',v);State.lang=v;emit();};
export function pushNote(txt){State.notes.unshift({ts:new Date(),txt});if(State.notes.length>50)State.notes.pop();emit();}
export function coachSay(role,txt){State.coach.push({ts:new Date(),role,txt});if(State.coach.length>100)State.coach.shift();emit();}
function tick(){const d=Math.round((Math.random()-0.4)*1500);State.kpi.revenue=Math.max(250000,State.kpi.revenue+d);
if(Math.random()<.22)pushNote(`Ny order skapad #M-${10000+Math.floor(Math.random()*9000)}`);
if(Math.random()<.14)coachSay('ai','Tips: skala upp kampanj i Region Syd där konvertering är högst.');emit();}
export function initState(){setInterval(tick,3000);setTimeout(()=>coachSay('ai','Hej! Jag är din AI-coach. Jag bevakar KPI:er, lager och deadlines.'),400);}