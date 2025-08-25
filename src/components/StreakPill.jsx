import React from "react";
import { useGame } from "../providers/GameStateProvider";

export default function StreakPill(){
  const { state } = useGame();
  return (
    <div className="glass" title="Daily streak" style={{padding:"10px 14px", borderRadius:16, minWidth:80, textAlign:"center"}}>
      🔥 {state.streak}d
    </div>
  );
}
