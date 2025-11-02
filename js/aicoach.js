const Coach = {
  boot(){
    const el = document.getElementById('coachBody');
    el.innerHTML = `<div class="muted">Hej! Jag är din AI-coach. Jag bevakar KPI, lager och deadlines. 
    Säg vad du vill ha hjälp med.</div>`;
  },
  send(){
    const inp = document.getElementById('coachInput');
    const q = (inp.value||'').trim();
    if(!q) return;
    const el = document.getElementById('coachBody');
    const t = new Date().toLocaleTimeString();
    el.innerHTML += `<div class="row"><b>Du</b><span class="muted">${t}</span></div><div class="row"><span>${q}</span></div>`;
    inp.value='';
    // mock svar
    setTimeout(()=>{
      const ans = this.mock(q);
      el.innerHTML += `<div class="row"><b>AI</b><span class="muted">${new Date().toLocaleTimeString()}</span></div><div class="row"><span>${ans}</span></div>`;
      el.scrollTop = el.scrollHeight;
      notis('AI-svar mottaget');
    }, 450);
  },
  mock(q){
    const s = q.toLowerCase();
    if(s.includes('budget')) return 'Prognos: Q4 budget upp 8–12% givet nuvarande GM och ordertempo.';
    if(s.includes('lager') || s.includes('stock')) return 'Brist: CAR-CHG-60W (4 kvar). Rek. lägg inköpsorder nu för att ej missa Q4-leveranser.';
    if(s.includes('karta') || s.includes('besök')) return 'Plan: besök Region Syd där konvertering är högst just nu.';
    return 'Noterat. Vill du att jag genererar en snabb rapport med KPI och inköpsrekommendationer?';
  }
};
