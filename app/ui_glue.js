// attaches global MX helpers for onclicks
import { notify } from './state.js';
window.MX = {
  upload(){ notify('Uppladdning öppnas (mock).'); },
  showQueue(){ notify('3 kvitton väntar tolkning'); },
  addCustomer(){ notify('Formulär "Ny kund" expanderas (mock).'); },
  addProduct(){ notify('Formulär "Ny produkt" expanderas (mock).'); },
  newOrder(){ notify('Orderformulär öppnas (mock).'); },
  newInvoice(){ notify('Faktura skapad (mock)'); }
};
