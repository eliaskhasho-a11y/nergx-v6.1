
const State = {
  lang: 'sv',
  kpi: { revenue: 512400, orders: 128, margin: 0.58, costs: 221300, budget: 480000 },
  customers: [
    { id:'C2001', name:'Åhléns City', city:'Stockholm', value:220000, status:'Aktiv' },
    { id:'C2002', name:'Tammerbrands', city:'Tammerfors', value:175000, status:'Aktiv' },
    { id:'C2003', name:'Mekonomen', city:'Västerås', value:122000, status:'Prospekt' },
    { id:'C2004', name:'Power', city:'Göteborg', value:98000, status:'Risk' },
  ],
  products: [
    { sku:'USB-C-60W', name:'USB-C till USB-C 60W', stock: 6, price: 199 },
    { sku:'C-Light-27W', name:'USB-C till Lightning 27W', stock: 11, price: 179 },
  ],
  invoices: [
    { no:'INV-20011', customer:'Åhléns City', amount: 64000, status:'Skickad' },
    { no:'INV-20012', customer:'Tammerbrands', amount: 92000, status:'Förfaller 10d' },
    { no:'INV-20013', customer:'Mekonomen', amount: 31000, status:'Betald' }
  ],
  stockAlerts: [
    { sku:'USB-C-60W', product:'USB-C till USB-C 60W', level:6, status:'brist' },
    { sku:'C-Light-27W', product:'USB-C till Lightning 27W', level:11, status:'låg' }
  ],
  files: [
    { name:'Kvitto_2025-10-14.jpg', size:'1.2 MB', note:'Bränsle', route:'Ekonomi' },
    { name:'Följesedel_INV-20012.pdf', size:'220 KB', note:'Tammerbrands', route:'Order' }
  ]
};
