import React, { createContext, useContext, useMemo, useState, useEffect, useRef } from "react";

const SfxCtx = createContext(null);
export const useSfx = () => useContext(SfxCtx);

const sources = {
  boot: "/sfx/boot.mp3",
  confirm: "/sfx/confirm.mp3",
  xp: "/sfx/xp.mp3",
  levelup: "/sfx/levelup.mp3",
  timerStart: "/sfx/timerStart.mp3",
  timerDone: "/sfx/timerDone.mp3",
  panelOpen: "/sfx/panelOpen.mp3", // 👈 NEW
};

export function SfxProvider({ children }){
  const [muted, setMuted] = useState(false);
  const unlockedRef = useRef(false);
  const cacheRef = useRef({});

  // Preload
  useEffect(() => {
    Object.entries(sources).forEach(([k, url]) => {
      const el = new Audio(url);
      el.preload = "auto";
      el.volume = 0.5;
      cacheRef.current[k] = el;
    });
  }, []);

  // Unlock after first gesture (mobile)
  useEffect(() => {
    const unlock = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
      Object.values(cacheRef.current).forEach((el) => {
        try {
          el.muted = true;
          el.play().then(() => { el.pause(); el.currentTime = 0; el.muted = false; }).catch(()=>{});
        } catch {}
      });
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock, { passive: true });
    };
    window.addEventListener("click", unlock);
    window.addEventListener("touchstart", unlock, { passive: true });
    return () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, []);

  const play = (key) => {
    if (muted) return;
    const el = cacheRef.current[key];
    if (!el) return;
    try { el.currentTime = 0; el.play().catch(()=>{}); } catch {}
  };

  const value = useMemo(()=>({ play, muted, setMuted }),[muted]);
  return <SfxCtx.Provider value={value}>{children}</SfxCtx.Provider>;
}
