
export const $ = sel => document.querySelector(sel);
export const $$ = sel => Array.from(document.querySelectorAll(sel));
export const el = (tag, props={}, ...children) => {
  const n = Object.assign(document.createElement(tag), props);
  for(const c of children){
    if(typeof c === 'string') n.appendChild(document.createTextNode(c));
    else if(c) n.appendChild(c);
  }
  return n;
};
export const clear = node => { while(node.firstChild) node.removeChild(node.firstChild); };
