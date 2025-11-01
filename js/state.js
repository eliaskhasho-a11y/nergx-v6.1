
window.MX = {
  theme: localStorage.getItem('mx_theme') || 'light',
  lang: localStorage.getItem('mx_lang') || 'sv',
  role: localStorage.getItem('mx_role') || 'Admin',
  notices: [], aiLog: [], audit: JSON.parse(localStorage.getItem('mx_audit')||'[]'),
  kpi: { revenue: 324500, orders: 71, gm: 0.62 },
  customers: JSON.parse(localStorage.getItem('mx_customers') || '[]'),
  workflows: JSON.parse(localStorage.getItem('mx_workflows') || '[]'),
  mapPoints: JSON.parse(localStorage.getItem('mx_map') || '[{"x":140,"y":140,"name":"Stock Wireless"},{"x":260,"y":190,"name":"Nordic Mobile"}]'),
  businessPages: JSON.parse(localStorage.getItem('mx_biz') || '[]'),
  documents: JSON.parse(localStorage.getItem('mx_docs') || '[]'),
  pushAudit(evt){ this.audit.unshift({ts: Date.now(), ...evt}); localStorage.setItem('mx_audit', JSON.stringify(this.audit.slice(0,500))); },
  save(){
    localStorage.setItem('mx_customers', JSON.stringify(this.customers));
    localStorage.setItem('mx_workflows', JSON.stringify(this.workflows));
    localStorage.setItem('mx_map', JSON.stringify(this.mapPoints));
    localStorage.setItem('mx_biz', JSON.stringify(this.businessPages));
    localStorage.setItem('mx_docs', JSON.stringify(this.documents));
    localStorage.setItem('mx_theme', this.theme);
    localStorage.setItem('mx_lang', this.lang);
    localStorage.setItem('mx_role', this.role);
  }
};
if (MX.customers.length===0){
  MX.customers = [
    {name:'Elon Ljud & Bild Västerås', org:'556677-8899', person:'Sara', mail:'sara@elon.se', tel:'070-1234567', tags:'B2B, Retail'},
    {name:'Mekonomen City', org:'112233-4455', person:'Tomas', mail:'tomas@mekonomen.se', tel:'070-7654321', tags:'B2B, Auto'}
  ];
  MX.save();
}
