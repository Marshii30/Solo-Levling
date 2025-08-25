import React, { useState } from "react";
import { useSfx } from "../providers/SfxProvider";

export default function BootOverlay({ onDone }) {
  const { play } = useSfx();
  const [fading, setFading] = useState(false);

  const start = () => {
    // This click is a user gesture → audio allowed
    play("boot");        // optional boot blip
    play("panelOpen");   // 👈 play your electric open SFX here
    setFading(true);
    setTimeout(() => onDone?.(), 650); // fade out then show panel
  };

  return (
    <div
      onClick={start}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 4,
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(circle at 50% 50%, rgba(0,230,255,.08), rgba(0,0,0,.88))",
        opacity: fading ? 0 : 1,
        transition: "opacity 650ms ease",
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div style={{ letterSpacing: 2, opacity: 0.8, marginBottom: 6 }}>
          INITIALIZING
        </div>
        <h1 style={{ margin: 0, marginBottom: 12 }}>SYSTEM ONLINE</h1>
        <div
          style={{
            fontSize: 14,
            opacity: 0.8,
            border: "1px solid rgba(255,255,255,.22)",
            display: "inline-block",
            padding: "10px 16px",
            borderRadius: 12,
            background: "rgba(255,255,255,.05)",
          }}
        >
          Tap to continue
        </div>
      </div>
    </div>
  );
}
