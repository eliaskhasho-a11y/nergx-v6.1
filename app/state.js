export const State = { route:'dashboard', theme:'light', lang:'sv', data:null };

export async function initState(){
  try{
    const res = await fetch('./data/demo.json');
    State.data = await res.json();
  }catch(e){
    // fallback
    State.data = {
      kpi:{revenue:324500,orders:71,gm:0.62},
      schedule:[{t:'09:00',txt:'Orderplock (Jesper)'},{t:'11:00',txt:'Kundmöte — Nordic'},{t:'14:00',txt:'Inventarie (Lea)'}],
      stock:[{sku:'CAR-CHG-60W',name:'Bil-laddare 60W',level:4,status:'brist'},{sku:'LIGHT-27W',name:'LED-lampa 27W',level:12,status:'låg'}],
      customers:[{name:'Nordic AB',org:'556677-8899',email:'kontakt@nordic.se',value:'A'}]
    };
  }
}

export function money(v){ return new Intl.NumberFormat('sv-SE').format(v)+' kr'; }
export function pct(v){ return Math.round(v*100)+' %'; }

export function notify(txt){
  const box = document.getElementById('notis');
  box.textContent = txt;
  box.classList.add('show');
  setTimeout(()=>box.classList.remove('show'), 2200);
}
