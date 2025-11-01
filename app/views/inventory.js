export function renderInventory(){
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <div style="font-weight:700">Produkter / Lager</div>
      <button class="btn" onclick="window.MX.addProduct()">+ Ny produkt</button>
    </div>
    <div style="border:1px dashed #e5e7eb;border-radius:12px;padding:14px;color:#94a3b8">
      (Inventarie placeholder — lista/filtrering i v7.2)
    </div>
  `;
}
