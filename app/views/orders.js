export function renderOrders(){
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <div style="font-weight:700">Order / Faktura</div>
      <div style="display:flex;gap:8px">
        <button class="btn" onclick="window.MX.newOrder()">+ Skapa order</button>
        <button class="btn" onclick="window.MX.newInvoice()">+ Skapa faktura</button>
      </div>
    </div>
    <div class="muted">AI fyller förslag (kund, rader, betalvillkor) och låter dig godkänna innan skick.</div>
  `;
}
