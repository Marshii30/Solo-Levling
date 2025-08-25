import React from "react";
import { useGame } from "../providers/GameStateProvider";

export default function LevelBadge(){
  const { state } = useGame();
  return (
    <div className="glass" style={{width:64, height:64, borderRadius:16, display:"grid", placeItems:"center"}}>
      <div style={{fontWeight:700, letterSpacing:.6}}>Lv {state.level}</div>
    </div>
  );
}
