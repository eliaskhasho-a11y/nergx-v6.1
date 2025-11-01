
const KEY='mergx_prefs_v64';
export const savePrefs = (p) => localStorage.setItem(KEY, JSON.stringify(p));
export const loadPrefs = () => { try { return JSON.parse(localStorage.getItem(KEY))||{} } catch { return {} } };
