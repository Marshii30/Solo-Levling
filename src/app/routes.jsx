import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import EvaluatePanel from "../components/EvaluatePanel";
import TaskPage from "../components/TaskPage";
import { useGame } from "../providers/GameStateProvider";

export default function RoutesView(){
  const { state } = useGame();
  return (
    <Routes>
      <Route path="/" element={<EvaluatePanel/>}/>
      <Route path="/a" element={state.player ? <TaskPage type="lowHydration"/> : <Navigate to="/" replace/>}/>
      <Route path="/b" element={state.player ? <TaskPage type="optimalHydration"/> : <Navigate to="/" replace/>}/>
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  );
}
