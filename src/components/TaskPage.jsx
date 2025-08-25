import React, { useMemo, useState } from "react";
import { TASKS } from "../lib/tasks";
import TaskList from "./TaskList";
import { useGame } from "../providers/GameStateProvider";
import MissionClearModal from "./MissionClearModal.jsx"; 

export default function TaskPage({ type }){
  const { state } = useGame();
  const data = useMemo(()=> type==="lowHydration" ? TASKS.lowHydration : TASKS.optimalHydration, [type]);
  const [open, setOpen] = useState(false);

  const completedCount = state.dayLog ? Object.keys(state.dayLog.completed||{}).length : 0;
  const allDone = completedCount >= data.length;

  return (
    <>
      <div className="page-wrap">
        <div className="glass" style={{width:"min(760px, 94vw)", padding:24}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <h2 style={{margin:0}}>
              {type==="lowHydration" ? "Immediate Conditioning Required" : "Enhanced Performance Routine"}
            </h2>
            <div style={{opacity:.75}}>Player: <strong>{state.player?.name}</strong></div>
          </div>
          <p style={{opacity:.8, marginTop:8}}>
            {type==="lowHydration"
              ? "Hydration below 2L detected. Complete this protocol to stabilize stats."
              : "Hydration optimal. Execute the enhanced routine for bonus gains."}
          </p>
          <TaskList tasks={data} onAllDone={()=>setOpen(true)}/>
        </div>
      </div>
      <MissionClearModal open={allDone || open} onClose={()=>setOpen(false)}/>
    </>
  );
}
