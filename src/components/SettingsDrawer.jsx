import React from "react";
import { useGame } from "../providers/GameStateProvider";
import { useSfx } from "../providers/SfxProvider";

export default function SettingsDrawer({ open, onClose }){
  const { state, resetToday, hardReset } = useGame();
  const { muted, setMuted } = useSfx();

  if(!open) return null;
  return (
    <div style={{position:"fixed", inset:0, zIndex:5, display:"grid", placeItems:"center", background:"rgba(0,0,0,.35)"}} onClick={onClose}>
      <div className="glass" onClick={e=>e.stopPropagation()} style={{width:"min(560px, 92vw)", padding:20}}>
        <h3 style={{marginTop:0}}>Settings</h3>
        <div style={{display:"flex", gap:12, alignItems:"center", justifyContent:"space-between"}}>
          <div>Sound</div>
          <button className="btn" onClick={()=>setMuted(!muted)}>{muted ? "Unmute" : "Mute"}</button>
        </div>
        <hr className="hr"/>
        <div style={{display:"flex", gap:8}}>
          <button className="btn" onClick={resetToday}>Reset today</button>
          <button className="btn" onClick={hardReset}>Hard reset</button>
          <div style={{marginLeft:"auto", opacity:.7}}>All data stays in your browser.</div>
        </div>
      </div>
    </div>
  );
}
