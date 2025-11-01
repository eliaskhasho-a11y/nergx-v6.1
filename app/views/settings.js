export function renderSettings(){
  return `
    <div style="font-weight:700;margin-bottom:10px">Inställningar</div>
    <ul class="muted" style="margin:0;padding-left:16px">
      <li>Tema (ljust/mörkt)</li>
      <li>Språk (sv/en/th)</li>
      <li>API-nycklar (OpenAI, frakt, finans)</li>
      <li>Notisregler (push, mail, WhatsApp via bridge senare)</li>
      <li>Datakopplingar (Fortnox/Visma/Frakt/SMS)</li>
      <li>Backup/Export, Logg & Audit</li>
    </ul>
  `;
}
