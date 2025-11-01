
import {el} from '../utils/dom.js';
export const bars = (vals)=>{
  const wrap = el('div',{className:'chart'});
  const mk = (h, cls='') => el('div',{className:'bar '+cls, style:`height:${Math.max(8,h)}px`});
  wrap.append(mk(vals.oms,'blue'), mk(vals.kost,'turq'), mk(vals.gmP,'purp'), mk(vals.bud,'gray'));
  return wrap;
};
