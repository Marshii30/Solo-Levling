const KEY = "sl:gameState@v1";
export const loadState = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch { return null; }
};
export const saveState = (state) => {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
};
export const clearAll = () => localStorage.removeItem(KEY);
