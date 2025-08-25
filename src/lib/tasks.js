export const TASKS = {
  lowHydration: [
    { id:"pushups15",  label:"15 Pushups",             xp:40,  type:"count" },
    { id:"squats10",   label:"10 Squats",              xp:40,  type:"count" },
    { id:"highjumps10m",label:"High Jumps — 10 min",   xp:80,  type:"timer", minutes:10 },
    { id:"phoneCooldown60", label:"Phone Cooldown — 60 min", xp:120, type:"timer", minutes:60 },
  ],
  optimalHydration: [
    { id:"walk10k",    label:"Walk 10,000 steps",      xp:200, type:"count" },
    { id:"stretch10m", label:"Stretch — 10 min",       xp:80,  type:"timer", minutes:10 },
    { id:"jog30m",     label:"Jog — 30 min",           xp:180, type:"timer", minutes:30 },
  ]
};
