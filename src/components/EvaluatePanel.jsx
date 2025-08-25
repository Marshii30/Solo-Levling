import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ElectricBox from "./ElectricBox";
import { useGame } from "../providers/GameStateProvider";
import { useSfx } from "../providers/SfxProvider";

export default function EvaluatePanel(){
  const { setPlayer, evaluateRoute } = useGame();
  const { play } = useSfx();
  const nav = useNavigate();
  const [form, setForm] = useState({ name:"", age:"", hydrationL:"" });

  const submit = (e)=>{
    e.preventDefault();
    const age = Number(form.age||0), hydrationL = Number(form.hydrationL||0);
    if(!form.name || form.name.length<2) return alert("Enter a valid name");
    if(age<10 || age>80) return alert("Enter a valid age (10–80)");
    if(hydrationL<0 || hydrationL>10) return alert("Water must be 0–10 L");

    play("confirm");
    setPlayer({ name:form.name.trim(), age, hydrationL });
    evaluateRoute(hydrationL);
    nav(hydrationL < 2 ? "/a" : "/b");
  };

  return (
    <div className="page-wrap">
      <ElectricBox width="min(580px, 94vw)">
        <HeaderBar/>
        <h2 style={{margin:"10px 0 18px", letterSpacing:2}}>LOGIN</h2>

        <form onSubmit={submit} style={{display:"grid", gap:14}}>
          <Field label="PLAYER NAME">
            <input className="input" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} placeholder="Sung Jin‑Woo"/>
          </Field>

          <Field label="AGE">
            <input className="input" type="number" value={form.age} onChange={e=>setForm(f=>({...f, age:e.target.value}))} placeholder="20"/>
          </Field>

          <Field label="WATER TODAY (L)">
            <input className="input" type="number" step="0.1" value={form.hydrationL} onChange={e=>setForm(f=>({...f, hydrationL:e.target.value}))} placeholder="2.5"/>
          </Field>

          <button
            className="btn"
            style={{
              marginTop:6,
              background:"linear-gradient(180deg,#FFB34A,#D77912)",
              color:"#14181c", fontWeight:900, letterSpacing:.8,
              borderColor:"rgba(255,180,74,.5)", boxShadow:"0 12px 32px rgba(255,140,0,.25)"
            }}
          >
            PLAY
          </button>
        </form>

        <div style={{opacity:.75, fontSize:12, marginTop:12}}>
          Tip: <strong>2.0 L</strong> or more unlocks the Enhanced Routine.
        </div>
      </ElectricBox>
    </div>
  );
}

function HeaderBar(){
  return (
    <div style={{display:"flex", alignItems:"center", gap:10, marginBottom:10}}>
      <span style={{color:"var(--neo-primary)"}}>⚡</span>
      <div style={{opacity:.85, letterSpacing:.5}}>NOTIFICATION</div>
      <div style={{flex:1, height:1, background:"linear-gradient(90deg, var(--neo-primary), transparent)"}}/>
    </div>
  );
}

function Field({ label, children }){
  return (
    <div>
      <div style={{fontSize:12, opacity:.8, marginBottom:6}}>{label}</div>
      {children}
    </div>
  );
}
