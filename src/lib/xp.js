export const xpNeeded = (level) => 100 + 50 * (level - 1) * (level - 1);
export function addXP(state, delta){
  let total = state.totalXP + delta;
  let lvl = state.level;
  let needed = xpNeeded(lvl);
  let leveledUp = false;
  while(total >= needed){
    total -= needed; lvl += 1; needed = xpNeeded(lvl); leveledUp = true;
  }
  return { total, lvl, leveledUp };
}
