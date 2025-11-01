import { State, money, pct } from '../state.js';

export function renderDashboard(){
  const d = State.data||{};
  const k = d.kpi||{revenue:0,orders:0,gm:0};
  const sch = d.schedule||[];
  const stock = d.stock||[];
  return `
    <div class="grid">
      <div class="card kpi col-4"><div class="muted">Omsättning idag</div><div class="v">${money(k.revenue)}</div><div class="muted">+12 % mot igår</div></div>
      <div class="card kpi col-4"><div class="muted">Order idag</div><div class="v">${k.orders}</div><div class="muted">3 stora B2B</div></div>
      <div class="card kpi col-4"><div class="muted">Bruttomarginal</div><div class="v">${pct(k.gm)}</div><div class="muted">Stabil nivå</div></div>

      <div class="card col-12">
        <div style="font-weight:700;margin-bottom:8px">Ekonomi — kombostaplar</div>
        <div class="muted" style="margin-bottom:10px">Visar Omsättning (blå), Kostnader (turkos), GM% (lila), Budget (grå).</div>
        <div style="height:160px;border:1px dashed #e5e7eb;border-radius:12px;display:grid;place-items:center;color:#94a3b8">
          (Placeholder graf — aktiveras i v7.2)
        </div>
      </div>

      <div class="card col-6">
        <div style="font-weight:700;margin-bottom:8px">Schema (dag)</div>
        <ul style="margin:0;padding-left:16px;color:#334155">
          ${sch.map(x=>`<li>${x.t} ${x.txt}</li>`).join('')}
        </ul>
      </div>

      <div class="card col-6">
        <div style="font-weight:700;margin-bottom:8px">Lager — brist / inköp</div>
        <table class="table">
          <thead><tr><th>SKU</th><th>Produkt</th><th>Nivå</th><th>Status</th></tr></thead>
          <tbody>
            ${stock.map(s=>`<tr><td>${s.sku}</td><td>${s.name}</td><td>${s.level}</td><td class="${s.status==='brist'?'bad':'warn'}">${s.status}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>

      <div class="card col-6">
        <div style="font-weight:700;margin-bottom:8px">AI-Karta</div>
        <div class="muted">Mini-karta (mock): Rek. besök nära dig baserat på potential.</div>
        <div style="height:160px;border:1px dashed #e5e7eb;border-radius:12px;margin-top:8px;display:grid;place-items:center;color:#94a3b8">
          (Kart-placeholder — full i v7.2)
        </div>
      </div>

      <div class="card col-6">
        <div style="font-weight:700;margin-bottom:8px">Filer / Kvitton</div>
        <div class="muted" style="margin-bottom:6px">Stöder notering, markering till Ekonomi/Admin och export till revisor.</div>
        <div style="display:flex;gap:8px">
          <button class="btn" onclick="window.MX.upload()">Ladda upp</button>
          <button class="btn" onclick="window.MX.showQueue()">Visa kö</button>
        </div>
      </div>
    </div>
  `;
}
