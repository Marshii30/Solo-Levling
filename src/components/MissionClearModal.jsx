import React from "react";
import { useGame } from "../providers/GameStateProvider";

export default function MissionClearModal({ open, onClose }){
  const { state } = useGame();
  if(!open) return null;

  return (
    <div style={{position:"fixed", inset:0, zIndex:6, display:"grid", placeItems:"center", background:"rgba(0,0,0,.5)"}} onClick={onClose}>
      <div className="glass" onClick={e=>e.stopPropagation()} style={{padding:24, width:"min(520px, 92vw)", textAlign:"center"}}>
        <h2 style={{marginTop:6, marginBottom:8, color:"var(--accent)"}}>MISSION CLEAR</h2>
        <div style={{opacity:.8, marginBottom:12}}>
          XP Today: <strong>{state.dayLog?.xpEarned || 0}</strong> · Level: <strong>{state.level}</strong> · Streak: <strong>{state.streak}d</strong>
        </div>
        <button className="btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
