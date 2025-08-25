import React, { useState } from "react";
import { useGame } from "../providers/GameStateProvider";
import { useSfx } from "../providers/SfxProvider";

export default function TaskItem({ task }){
  const { state, awardXP, undoTask } = useGame();
  const { play } = useSfx();
  const done = !!state.dayLog?.completed?.[task.id];
  const [undoing, setUndoing] = useState(false);

  const onToggle = ()=>{
    if(done) return; // idempotent
    awardXP(task.id, task.xp);
    play("xp");
    setUndoing(true);
    setTimeout(()=> setUndoing(false), 5000);
  };

  const onUndo = ()=>{ undoTask(task.id, task.xp); setUndoing(false); };

  return (
    <div className="glass" style={{padding:16, display:"flex", alignItems:"center", gap:12, justifyContent:"space-between"}}>
      <div style={{display:"flex", alignItems:"center", gap:12}}>
        <input type="checkbox" checked={done} onChange={onToggle} aria-label={`Complete ${task.label}`}/>
        <div>
          <div style={{fontWeight:600}}>{task.label}</div>
          <div style={{fontSize:12, opacity:.7}}>{task.xp} XP</div>
        </div>
      </div>
      {undoing && !done && (
        <button className="btn" onClick={onUndo} title="Undo">Undo</button>
      )}
      {done && <span style={{opacity:.7}}>✅</span>}
    </div>
  );
}
