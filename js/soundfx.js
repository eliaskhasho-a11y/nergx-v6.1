
export const SoundFX = (() => {
  let ctx, enabled = true, volume = 0.15, lastAt = 0;
  const stateKey = 'mergx.sound';
  const now = () => performance.now();
  const can = () => enabled && document.visibilityState === 'visible' && (now()-lastAt>120);
  const save = () => localStorage.setItem(stateKey, JSON.stringify({enabled,volume}));
  const load = () => { try{ const s=JSON.parse(localStorage.getItem(stateKey)||'{}'); if(typeof s.enabled==='boolean')enabled=s.enabled; if(typeof s.volume==='number')volume=Math.min(1,Math.max(0,s.volume)); }catch{} };
  const ctxOk = () => { if(!ctx) ctx = new (window.AudioContext||window.webkitAudioContext)(); if(ctx.state==='suspended') ctx.resume(); };
  const env = (g,t,a=0.002,d=0.08,s=0.0001,r=0.12)=>{ g.gain.cancelScheduledValues(t); g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(volume, t+a); g.gain.linearRampToValueAtTime(volume*s, t+a+d); g.gain.linearRampToValueAtTime(0.00001, t+a+d+r); };
  const blip=(f=420,dur=0.10,type='sine')=>{ if(!can())return; ctxOk(); const t=ctx.currentTime; const o=ctx.createOscillator(), g=ctx.createGain(); o.type=type; o.frequency.setValueAtTime(f,t); env(g,t); o.connect(g).connect(ctx.destination); o.start(t); o.stop(t+dur); lastAt=now(); };
  const sweep=(f1=180,f2=420,dur=0.22,type='triangle')=>{ if(!can())return; ctxOk(); const t=ctx.currentTime; const o=ctx.createOscillator(), g=ctx.createGain(); o.type=type; o.frequency.setValueAtTime(f1,t); o.frequency.exponentialRampToValueAtTime(f2,t+dur); env(g,t,0.005,0.12,0.001,0.18); o.connect(g).connect(ctx.destination); o.start(t); o.stop(t+dur+0.05); lastAt=now(); };
  const chime=()=>{ if(!can())return; ctxOk(); const t=ctx.currentTime; const mk=(f,dt=0)=>{ const o=ctx.createOscillator(), g=ctx.createGain(); o.type='sine'; o.frequency.setValueAtTime(f,t+dt); env(g,t+dt,0.003,0.1,0.002,0.25); o.connect(g).connect(ctx.destination); o.start(t+dt); o.stop(t+dt+0.35); }; mk(640); mk(960,0.05); mk(1280,0.08); lastAt=now(); };
  const pluck=()=>{ if(!can())return; ctxOk(); const t=ctx.currentTime; const o=ctx.createOscillator(), g=ctx.createGain(); o.type='square'; o.frequency.setValueAtTime(280,t); o.frequency.exponentialRampToValueAtTime(160,t+0.12); env(g,t,0.001,0.07,0.0005,0.18); o.connect(g).connect(ctx.destination); o.start(t); o.stop(t+0.25); lastAt=now(); };
  return {
    init(){ load(); },
    setEnabled(v){ enabled=!!v; save(); },
    setVolume(v){ volume=Math.min(1,Math.max(0,v)); save(); },
    state(){ return {enabled, volume}; },
    navTap(){ blip(420, .10, 'sine'); },
    paneOpen(){ sweep(220, 420, .20, 'triangle'); },
    success(){ chime(); },
    error(){ pluck(); }
  };
})();
