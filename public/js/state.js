
export const State = {
  theme:'light',
  lang:'sv',
  kpi:{revenue:354200,orders:83,gm:0.64},
  bars:{oms:340,kost:115,gmP:64,bud:330},
  schedule:[
    {time:'09:00',txt:'Orderplock (Jesper)'},
    {time:'11:00',txt:'Kundmöte — Nordic'},
    {time:'14:00',txt:'Inventarie (Lea)'},
  ],
  stock:[
    { sku:'ACC-CAR-60W', name:'Bil-laddare 60W', level:4, min:15, buy:50 },
    { sku:'CAB-USB-C-60W', name:'USB-C till USB-C 60W', level:28, min:30, buy:100 },
    { sku:'CAB-LIGHT-27W', name:'USB-C till Lightning 27W', level:12, min:20, buy:80 },
  ],
  customers:[
    { id:'C1001', company:'Elon Ljud & Bild Västerås', contact:'Maria S', email:'maria@elon.se', org:'556100-1234', city:'Västerås', type:'B2B', status:'aktiv' },
    { id:'C1002', company:'iRepair Stockholm', contact:'Omar A', email:'omar@irepair.se', org:'559010-9876', city:'Stockholm', type:'B2B', status:'ny' },
    { id:'C1003', company:'Viking Line Store', contact:'Lina K', email:'lina@vikingline.com', org:'556222-4455', city:'Stockholm', type:'B2B', status:'aktiv' },
  ],
  products:[
    { sku:'ACC-CAR-60W', name:'Bil-laddare 60W', price:249, vat:0.25, stock:4 },
    { sku:'CAB-USB-C-60W', name:'USB-C till USB-C 60W', price:179, vat:0.25, stock:28 },
    { sku:'CAB-LIGHT-27W', name:'USB-C till Lightning 27W', price:199, vat:0.25, stock:12 }
  ],
  orders:[],
  notis:[],
};
