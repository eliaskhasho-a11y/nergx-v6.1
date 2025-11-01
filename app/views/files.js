export function renderFiles(){
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <div style="font-weight:700">Filer / OCR</div>
      <button class="btn" onclick="window.MX.upload()">+ Ladda upp</button>
    </div>
    <div class="muted">Bibliotek med mappar/etiketter, OCR och routing till Ekonomi/Admin.</div>
  `;
}
