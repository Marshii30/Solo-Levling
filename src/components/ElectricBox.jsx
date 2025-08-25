import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useSfx } from "../providers/SfxProvider";

export default function ElectricBox({ children, width = "min(580px, 94vw)" }) {
  const { play } = useSfx();

  useEffect(() => {
    play("panelOpen"); // 👈 plays zap sound once on mount
  }, [play]);

  return (
    <motion.div
      // start tiny + far back in Z space
      initial={{ scale: 0.1, opacity: 0, y: 200, z: -600, filter: "blur(10px)" }}
      animate={{ scale: 1, opacity: 1, y: 0, z: 0, filter: "blur(0px)" }}
      transition={{
        type: "spring",
        stiffness: 140,
        damping: 20,
        mass: 1.2,
        delay: 0.2
      }}
      className="holo-wrap scanlines noise"
      style={{
        width,
        padding: 0,
        position: "relative",
        overflow: "hidden",
        transformStyle: "preserve-3d"
      }}
    >
      {/* optional particle burst overlay */}
      <ParticleBurst />

      {/* holo frame (corners + bars) */}
      <div className="holo-bar top"></div>
      <div className="holo-bar bottom"></div>
      <div className="holo-corner tl"></div>
      <div className="holo-corner tr"></div>
      <div className="holo-corner bl"></div>
      <div className="holo-corner br"></div>

      <div className="holo-inner">{children}</div>
    </motion.div>
  );
}

function ParticleBurst() {
  // simple particles: cyan dots scattering on mount
  return (
    <motion.div
      initial={{ opacity: 1, scale: 0.4 }}
      animate={{ opacity: 0, scale: 2 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(circle at center, rgba(0,220,255,.3), transparent 70%)",
        pointerEvents: "none",
        zIndex: 1
      }}
    />
  );
}
