
const State = {
  lang: 'sv',
  kpi: { revenue: 324500, orders: 71, margin: 0.62 },
  customers: [
    { id:'C1001', name:'Nordic Retail AB', city:'Stockholm', value:125000, status:'Aktiv' },
    { id:'C1002', name:'Västerås Elektronik', city:'Västerås', value:56000, status:'Aktiv' },
    { id:'C1003', name:'Göteborg IT', city:'Göteborg', value:23000, status:'Risk' },
  ],
  invoices: [
    { no:'INV-10023', customer:'Nordic Retail AB', amount: 34500, status:'Skickad' },
    { no:'INV-10024', customer:'Västerås Elektronik', amount: 12900, status:'Betald' }
  ],
  stockAlerts: [
    { sku:'CAR-CHG-60W', product:'Bil-laddare 60W', level:4, status:'brist' },
    { sku:'LIGHT-27W', product:'LED-lampa 27W', level:12, status:'låg' }
  ]
};
