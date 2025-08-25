import React from "react";
import { useGame } from "../providers/GameStateProvider";
import { xpNeeded } from "../lib/xp";

export default function XPBar(){
  const { state } = useGame();
  const need = xpNeeded(state.level);
  const pct = Math.max(0, Math.min(100, (state.totalXP/need)*100));
  return (
    <div className="glass" style={{padding:10}}>
      <div style={{fontSize:12, opacity:.7, marginBottom:6}}>XP to Level {state.level+1}</div>
      <div style={{height:12, borderRadius:10, background:"rgba(255,255,255,.06)", overflow:"hidden"}}>
        <div style={{
          width:`${pct}%`, height:"100%",
          background:`linear-gradient(90deg, var(--neo-primary), var(--neo-secondary))`,
          transition:"width 350ms ease"
        }}/>
      </div>
    </div>
  );
}
