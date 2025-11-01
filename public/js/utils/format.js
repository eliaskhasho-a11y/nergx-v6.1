
export const money = n => new Intl.NumberFormat(undefined,{style:'currency',currency:'SEK', maximumFractionDigits:0}).format(n);
export const num = n => new Intl.NumberFormat().format(n);
export const dt  = d => new Date(d).toLocaleString();
