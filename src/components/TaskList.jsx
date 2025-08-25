import React, { useEffect } from "react";
import TaskItem from "./TaskItem";
import TimerCard from "./TimerCard";
import { useGame } from "../providers/GameStateProvider";

export default function TaskList({ tasks, onAllDone }){
  const { state } = useGame();
  const completed = state.dayLog?.completed || {};
  const done = Object.keys(completed).length;
  const total = tasks.length;

  useEffect(()=>{ if(done===total && total>0) onAllDone?.(); },[done,total,onAllDone]);

  return (
    <>
      <div style={{display:"flex", alignItems:"center", gap:12, margin:"8px 0 16px"}}>
        <ProgressRing value={done} total={total}/>
        <div style={{opacity:.8}}>{done} / {total} completed</div>
      </div>
      <div style={{display:"grid", gap:12}}>
        {tasks.map(t => t.type==="timer"
          ? <TimerCard key={t.id} task={t}/>
          : <TaskItem key={t.id} task={t}/>
        )}
      </div>
    </>
  );
}

function ProgressRing({ value, total }){
  const pct = total ? (value/total)*100 : 0;
  return (
    <div style={{width:48, height:48, borderRadius:"50%", position:"relative", background:"rgba(255,255,255,.05)"}}>
      <div style={{
        position:"absolute", inset:0, borderRadius:"50%",
        background:`conic-gradient(var(--accent) ${pct}%, transparent ${pct}%)`
      }}/>
      <div style={{position:"absolute", inset:4, borderRadius:"50%", background:"rgba(0,0,0,.3)", display:"grid", placeItems:"center", fontSize:12}}>
        {Math.round(pct)}%
      </div>
    </div>
  );
}
