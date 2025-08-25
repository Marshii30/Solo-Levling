import React, { useEffect, useMemo, useState } from "react";
import { useGame } from "../providers/GameStateProvider";
import { useSfx } from "../providers/SfxProvider";

export default function TimerCard({ task }){
  const { state, startTimer, finishTimer, awardXP } = useGame();
  const { play } = useSfx();
  const done = !!state.dayLog?.completed?.[task.id];
  const info = state.dayLog?.timers?.[task.id];
  const [now, setNow] = useState(Date.now());

  const remainingMs = useMemo(()=>{
    if(!info) return 0;
    const total = (info.minutes||task.minutes)*60*1000;
    const elapsed = now - info.startedAt;
    return Math.max(0, total - elapsed);
  },[info, now, task.minutes]);

  useEffect(()=>{
    if(!info) return;
    const iv = setInterval(()=> setNow(Date.now()), 1000);
    return ()=> clearInterval(iv);
  },[info]);

  useEffect(()=>{
    if(info && remainingMs===0 && !done){
      finishTimer(task.id);
      awardXP(task.id, task.xp);
      play("timerDone");
    }
  },[remainingMs, info, done, awardXP, play, finishTimer, task]);

  const start = ()=>{
    if(info || done) return;
    startTimer(task.id, task.minutes);
    play("timerStart");
  };

  return (
    <div className="glass" style={{padding:16, display:"flex", alignItems:"center", gap:12, justifyContent:"space-between"}}>
      <div>
        <div style={{fontWeight:600}}>{task.label}</div>
        <div style={{fontSize:12, opacity:.7}}>{task.xp} XP</div>
      </div>
      {done ? <span style={{opacity:.7}}>✅</span> : info ? <Countdown ms={remainingMs}/> : <button className="btn" onClick={start}>Start</button>}
    </div>
  );
}

function Countdown({ ms }){
  const s = Math.ceil(ms/1000);
  const m = Math.floor(s/60);
  const sec = s%60;
  return <div style={{fontVariantNumeric:"tabular-nums"}}>{m}:{sec.toString().padStart(2,"0")}</div>;
}
