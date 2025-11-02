
const Formatter = {
  money(n){ return new Intl.NumberFormat('sv-SE', {style:'currency', currency:'SEK', maximumFractionDigits:0}).format(n) }
};

const Notis = {
  init(){
    this.list = document.getElementById('notisList');
    this.count= document.getElementById('notisCount');
    this.push('MergX v8.0 startad.');
    setInterval(()=>{
      if(Math.random()<0.22){
        this.push('Ny order #M-'+(10000+Math.floor(Math.random()*9000)));
      }
    }, 6000);
  },
  push(txt){
    const li=document.createElement('li');
    li.textContent = `${new Date().toLocaleTimeString()} – ${txt}`;
    this.list.prepend(li);
    this.count.textContent = (parseInt(this.count.textContent||'0')+1);
  }
};

const Coach = {
  init(){
    this.wrap = document.getElementById('coachChat');
    this.form = document.getElementById('coachForm');
    this.input = document.getElementById('coachInput');
    this.say('Hej! Jag är din AI‑coach 2.0. Jag håller koll på KPI:er, deadlines, lager och budget – fråga vad som helst.', true);
    this.form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const q = this.input.value.trim();
      if(!q) return;
      this.say(q, false);
      this.input.value='';
      setTimeout(()=>{
        let a = 'Jag analyserar…';
        if(/omsätt|revenue|sales/i.test(q)) a = `Omsättning idag: ${Formatter.money(State.kpi.revenue)}. Prognos: +3.1% denna vecka.`;
        if(/order/i.test(q)) a = `Order idag: ${State.kpi.orders}. Högst värde: Åhléns City.`;
        if(/lager|stock/i.test(q)) a = `Brist på ${State.stockAlerts.map(s=>s.product).join(', ')}. Förslag: inköp idag + auto‑påminnelse.`;
        if(/budget|kostnad|marg/i.test(q)) a = `Budget ${Formatter.money(State.kpi.budget)}, kostnader ${Formatter.money(State.kpi.costs)}, margin ${Math.round(State.kpi.margin*100)}%.`;
        if(/karta|map/i.test(q)) a = `Hög potential i Stockholm & Tammerfors. Planerad rutt finns i AI‑Karta.`;
        this.say(a, true);
      }, 550);
    });
    this.input.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); this.form.requestSubmit(); }});
  },
  say(text, ai){
    const el = document.createElement('div');
    el.className = 'msg '+(ai?'ai':'you');
    el.innerHTML = text + `<small>${new Date().toLocaleTimeString()}</small>`;
    this.wrap.appendChild(el);
    this.wrap.scrollTop = this.wrap.scrollHeight;
  }
};
