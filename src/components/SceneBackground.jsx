import React, { useEffect, useRef } from "react";

export default function SceneBackground(){
  const near = useRef(null);
  const far = useRef(null);

  useEffect(()=>{
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mk = (el, count, spread)=> {
      el.innerHTML = "";
      for(let i=0;i<count;i++){
        const p = document.createElement("div");
        p.className = "p";
        p.style.left = Math.random()*100+"%";
        p.style.top = Math.random()*100+"%";
        p.style.width = p.style.height = (1+Math.random()*2)+"px";
        p.style.opacity = 0.08 + Math.random()*0.25;
        p.style.animationDuration = (10+Math.random()*20)+"s";
        p.style.filter = `drop-shadow(0 0 ${spread}px var(--neo-primary))`;
        el.appendChild(p);
      }
    };
    mk(near.current, rm?12:36, 10);
    mk(far.current, rm?20:60, 6);
  },[]);

  useEffect(()=>{
    const onMove = (e)=>{
      const x = (e.clientX/window.innerWidth - .5);
      const y = (e.clientY/window.innerHeight - .5);
      if(near.current) near.current.style.transform = `translate(${x*10}px, ${y*8}px)`;
      if(far.current)  far.current.style.transform  = `translate(${x*18}px, ${y*14}px)`;
    };
    window.addEventListener("mousemove", onMove);
    return ()=> window.removeEventListener("mousemove", onMove);
  },[]);

  return (
    <div style={{position:"fixed", inset:0, zIndex:0, overflow:"hidden", background:"#0b0f14"}}>
      <div style={{
        position:"absolute", inset:0,
        background: `
          radial-gradient(1000px 600px at 70% -10%, rgba(0,230,255,.18), transparent 60%),
          radial-gradient(900px 560px at 0% 110%, rgba(172,108,255,.14), transparent 60%),
          radial-gradient(1200px 800px at 50% 120%, rgba(25,255,169,.10), transparent 70%)
        `
      }}/>
      <div style={{
        position:"absolute", inset:0, transform:"rotateX(16deg) translateY(-120px)",
        transformOrigin:"center top", opacity:.15,
        backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
        backgroundSize:"48px 48px"
      }}/>
      <div ref={far}  style={{position:"absolute", inset:0}}/>
      <div ref={near} style={{position:"absolute", inset:0}}/>
      <style>{`
        .p{position:absolute; background:var(--neo-primary); border-radius:2px; animation:float linear infinite}
        @keyframes float { 0%{ transform:translateY(0)} 50%{ transform:translateY(-40px)} 100%{ transform:translateY(0)} }
      `}</style>
    </div>
  );
}
