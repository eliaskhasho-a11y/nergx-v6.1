
export const State = {
  kpi:{revenueToday:324500,ordersToday:71,margin:0.62,deltaRevenue:0.12},
  customers:[
    {id:1,name:"Stock Wireless",city:"Stockholm",lat:59.334,lng:18.066,potential:9,pipeline:"Prospect",last:"2025-11-02"},
    {id:2,name:"Nordic Tech",city:"Göteborg",lat:57.708,lng:11.974,potential:7,pipeline:"Qualified",last:"2025-10-26"},
    {id:3,name:"Luleå Phone",city:"Luleå",lat:65.584,lng:22.156,potential:6,pipeline:"Closed-Won",last:"2025-10-22"},
    {id:4,name:"Malmö Repair",city:"Malmö",lat:55.605,lng:13.003,potential:5,pipeline:"Proposal",last:"2025-10-12"}
  ],
  inventory:[
    {sku:"CAR-CHG-60W",name:"Bil-laddare 60W",stock:4,status:"brist"},
    {sku:"LIGHT-27W",name:"LED-lampa 27W",stock:12,status:"låg"},
    {sku:"A-Stick-C2C",name:"Kabel USB-C ↔ USB-C 60W",stock:88,status:"ok"}
  ],
  files:[
    {id:"F-1001",name:"Faktura_1001.pdf",tags:["faktura","ekonomi"],size:"124 KB",date:"2025-10-29"},
    {id:"F-1002",name:"Avtal_Stock_Wireless.pdf",tags:["avtal","crm"],size:"256 KB",date:"2025-10-21"}
  ],
  notifications:["MergX v8.15 RC laddad.","Order skapad #M-10306","Ny order #M-18791","AI-coach aktiv."],
  audit:[], automations:[{id:"A1",name:"Påminn lågt lager",trigger:"Inventory < 5",action:"Skicka notis till inköp"}],
  academy:[{id:"C1",title:"Kom igång med MergX",progress:80},{id:"C2",title:"Säljflöden & CRM",progress:40},{id:"C3",title:"Ekonomi & rapporter",progress:20}]
};
export function logAudit(evt){ State.audit.unshift({ts:new Date().toISOString(),evt}); }
export function formatSEK(n){ return n.toLocaleString('sv-SE',{style:'currency',currency:'SEK'}); }
export function fmtSize(b){ if(b<1024)return b+" B"; if(b<1024*1024)return (b/1024).toFixed(1)+" KB"; return (b/1024/1024).toFixed(1)+" MB"; }
export function escapeHTML(s){ return s.replace(/[&<>"']/g, m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
