import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSfx } from "../providers/SfxProvider";

export default function AlertModal({ open, onClose }) {
  const { play } = useSfx();
  const [count, setCount] = useState(10);

  useEffect(() => {
    let interval;
    if (open) {
      // Start countdown
      interval = setInterval(() => {
        setCount((c) => (c > 0 ? c - 1 : 0));
      }, 1000);

      // Play looping alarm
      const a = new Audio("/sfx/alert.mp3");
      a.loop = true;
      a.volume = 0.6;
      a.play().catch(() => {});
      // cleanup
      return () => {
        clearInterval(interval);
        a.pause();
        a.currentTime = 0;
        setCount(10);
      };
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        background: "rgba(0,0,0,0.85)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        style={{
          width: "min(520px, 92vw)",
          padding: 28,
          border: "2px solid red",
          boxShadow: "0 0 30px red",
          background: "rgba(40,0,0,0.95)",
          textAlign: "center",
          borderRadius: 16,
          animation: "pulseRed 1s infinite",
        }}
      >
        <h2 style={{ color: "red", marginBottom: 12 }}>
          [ SYSTEM WARNING ]
        </h2>
        <p style={{ marginBottom: 12, color: "#fff" }}>
          Tasks not initiated. Health rate will decrease by{" "}
          <strong style={{ color: "red" }}>-5%</strong>.
        </p>
        <p style={{ color: "#ff5555", fontWeight: "bold", fontSize: 20 }}>
          Penalty: Phone will get HANGED in {count}...
        </p>
        <button
          className="btn"
          style={{
            marginTop: 18,
            background: "red",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={onClose}
        >
          Begin Tasks Now
        </button>
      </motion.div>

      <style>{`
        @keyframes pulseRed {
          0% { box-shadow: 0 0 20px red; }
          50% { box-shadow: 0 0 40px red; }
          100% { box-shadow: 0 0 20px red; }
        }
      `}</style>
    </div>
  );
}
