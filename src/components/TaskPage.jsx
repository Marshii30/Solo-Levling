import React, { useMemo, useState, useEffect } from "react";
import { TASKS } from "../lib/tasks";
import TaskList from "./TaskList";
import { useGame } from "../providers/GameStateProvider";
import MissionClearModal from "./MissionClearModal.jsx";
import AlertModal from "./AlertModal.jsx";

export default function TaskPage({ type }) {
  const { state } = useGame();
  const data = useMemo(
    () =>
      type === "lowHydration"
        ? TASKS.lowHydration
        : TASKS.optimalHydration,
    [type]
  );

  const [open, setOpen] = useState(false);
  const [warning, setWarning] = useState(false);
  const [taskStarted, setTaskStarted] = useState(false);

  const completedCount = state.dayLog
    ? Object.keys(state.dayLog.completed || {}).length
    : 0;
  const allDone = completedCount >= data.length;

  // Idle check: trigger system warning if no task started
  useEffect(() => {
    if (!taskStarted && !allDone) {
      const t = setTimeout(() => setWarning(true), 2000); // ⚡ 2 seconds
      return () => clearTimeout(t);
    }
  }, [taskStarted, allDone]);

  return (
    <>
      <div className="page-wrap">
        <div
          className="glass"
          style={{ width: "min(760px, 94vw)", padding: 24 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ margin: 0 }}>
              {type === "lowHydration"
                ? "Immediate Conditioning Required"
                : "Enhanced Performance Routine"}
            </h2>
            <div style={{ opacity: 0.75 }}>
              Player: <strong>{state.player?.name}</strong>
            </div>
          </div>
          <p style={{ opacity: 0.8, marginTop: 8 }}>
            {type === "lowHydration"
              ? "Hydration below 2L detected. Complete this protocol to stabilize stats."
              : "Hydration optimal. Execute the enhanced routine for bonus gains."}
          </p>
          <TaskList
            tasks={data}
            onAllDone={() => setOpen(true)}
            onTaskStart={() => {
              setTaskStarted(true);
              setWarning(false);
            }}
          />
        </div>
      </div>

      {/* Mission clear modal */}
      <MissionClearModal open={allDone || open} onClose={() => setOpen(false)} />

      {/* System warning modal */}
      <AlertModal open={warning} onClose={() => setWarning(false)} />
    </>
  );
}
