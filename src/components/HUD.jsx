import React, { useState } from "react";
import XPBar from "./XPBar";
import LevelBadge from "./LevelBadge";
import StreakPill from "./StreakPill";
import SettingsDrawer from "./SettingsDrawer";

export default function HUD(){
  const [open, setOpen] = useState(false);
  return (
    <>
      <div style={{position:"fixed", top:16, left:16, right:16, zIndex:3, display:"flex", alignItems:"center", gap:12}}>
        <LevelBadge/>
        <div style={{flex:1}}><XPBar/></div>
        <StreakPill/>
        <button className="btn" onClick={()=>setOpen(true)} aria-label="Settings">⚙️</button>
      </div>
      <SettingsDrawer open={open} onClose={()=>setOpen(false)}/>
    </>
  );
}
