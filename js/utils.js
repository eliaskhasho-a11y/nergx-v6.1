
const Formatter = {
  money(n){ return new Intl.NumberFormat('sv-SE', {style:'currency', currency:'SEK', maximumFractionDigits:0}).format(n) }
};

const Notis = {
  init(){
    this.list = document.getElementById('notisList');
    this.count= document.getElementById('notisCount');
    this.push('MergX v7.7 startad.');
    setInterval(()=>{
      if(Math.random()<0.18){
        this.push('Ny order skapad #M-'+(10000+Math.floor(Math.random()*9000)));
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
    this.say('Hej! Jag är din AI‑coach. Jag bevakar KPI:er, lager och deadlines. Fråga vad du vill ha hjälp med.', true);
    this.form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const q = this.input.value.trim();
      if(!q) return;
      this.say(q, false);
      this.input.value='';
      setTimeout(()=>{
        let a = 'Jag analyserar…';
        if(/omsätt|revenue|sales/i.test(q)) a = `Dagens omsättning är ${Formatter.money(State.kpi.revenue)} (+12 % mot igår).`;
        if(/order/i.test(q)) a = `Du har ${State.kpi.orders} registrerade order idag. Tre av dem är B2B.`;
        if(/lager|stock/i.test(q)) a = `Brist på ${State.stockAlerts.map(s=>s.product).join(', ')}. Jag föreslår inköp.`;
        if(/karta|map/i.test(q)) a = `Hög potential: Stockholm och Västerås. Se AI‑Karta för rekommenderad rutt.`;
        this.say(a, true);
      }, 600);
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
