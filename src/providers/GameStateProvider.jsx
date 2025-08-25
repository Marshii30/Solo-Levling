import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { loadState, saveState, clearAll } from "../lib/storage";
import { todayIST } from "../lib/date";
import { addXP } from "../lib/xp";

const GameCtx = createContext(null);
export const useGame = () => useContext(GameCtx);

const initial = {
  player: null,                   // {name, age, hydrationL}
  level: 1,
  totalXP: 0,
  streak: 0,
  lastActiveDate: null,
  dayLog: null,                   // { date, route, completed: {id: {at}}, timers: {id: {startedAt?}}, xpEarned }
  settings: { theme:"neo" }
};

function reducer(state, action){
  switch(action.type){
    case "HYDRATE": return action.payload;
    case "SET_PLAYER":{
      const lastDate = state.lastActiveDate || todayIST();
      const date = todayIST();
      const rollover = (state.lastActiveDate && state.lastActiveDate !== date);
      let streak = state.streak;
      if(rollover){
        const hadXP = state.dayLog && state.dayLog.xpEarned > 0;
        streak = hadXP ? (state.streak + 1) : 0;
      }
      return { ...state, player: action.player, lastActiveDate: date, streak };
    }
    case "EVALUATE_ROUTE":{
      const route = action.hydrationL < 2 ? "A" : "B";
      const date = todayIST();
      return { ...state, dayLog: { date, route, completed:{}, timers:{}, xpEarned:0 } };
    }
    case "AWARD_XP":{
      const { taskId, xp } = action;
      if(!state.dayLog || state.dayLog.completed[taskId]) return state;
      const { total, lvl, leveledUp } = addXP(state, xp);
      return {
        ...state,
        level: lvl,
        totalXP: total,
        dayLog: {
          ...state.dayLog,
          completed: { ...state.dayLog.completed, [taskId]: { at: new Date().toISOString() } },
          xpEarned: state.dayLog.xpEarned + xp
        },
        lastEvent: { leveledUp }
      };
    }
    case "UNDO_TASK":{
      if(!state.dayLog || !state.dayLog.completed[action.taskId]) return state;
      const xp = action.xp;
      let total = Math.max(0, state.totalXP - xp);
      // We won't downgrade level on undo in v1 (simpler, user-friendly).
      const completed = { ...state.dayLog.completed }; delete completed[action.taskId];
      return { ...state, totalXP: total, dayLog: { ...state.dayLog, completed, xpEarned: Math.max(0, state.dayLog.xpEarned - xp) } };
    }
    case "START_TIMER":{
      if(!state.dayLog) return state;
      const timers = { ...state.dayLog.timers, [action.taskId]: { startedAt: Date.now(), minutes: action.minutes } };
      return { ...state, dayLog: { ...state.dayLog, timers } };
    }
    case "FINISH_TIMER":{
      if(!state.dayLog) return state;
      const timers = { ...state.dayLog.timers }; delete timers[action.taskId];
      return { ...state, dayLog: { ...state.dayLog, timers } };
    }
    case "RESET_TODAY":{
      if(!state.dayLog) return state;
      return { ...state, dayLog: { ...state.dayLog, completed:{}, timers:{}, xpEarned:0 } };
    }
    case "HARD_RESET":{
      clearAll(); return { ...initial };
    }
    default: return state;
  }
}

export function GameStateProvider({ children }){
  const persisted = loadState();
  const [state, dispatch] = useReducer(reducer, persisted || initial);

  // midnight rollover on mount
  useEffect(()=>{
    const date = todayIST();
    if(state.lastActiveDate && state.lastActiveDate !== date){
      const hadXP = state.dayLog && state.dayLog.xpEarned > 0;
      dispatch({ type:"HYDRATE", payload: {
        ...state,
        streak: hadXP ? (state.streak + 1) : 0,
        lastActiveDate: date,
        dayLog: null
      }});
    } else if(!state.lastActiveDate){
      dispatch({ type:"HYDRATE", payload: { ...state, lastActiveDate: date }});
    }
    // eslint-disable-next-line
  },[]);

  useEffect(()=>{
    saveState(state);
  },[state]);

  const actions = useMemo(()=>({
    setPlayer: (player)=> dispatch({ type:"SET_PLAYER", player }),
    evaluateRoute: (hydrationL)=> dispatch({ type:"EVALUATE_ROUTE", hydrationL }),
    awardXP: (taskId, xp)=> dispatch({ type:"AWARD_XP", taskId, xp }),
    undoTask: (taskId, xp)=> dispatch({ type:"UNDO_TASK", taskId, xp }),
    startTimer: (taskId, minutes)=> dispatch({ type:"START_TIMER", taskId, minutes }),
    finishTimer: (taskId)=> dispatch({ type:"FINISH_TIMER", taskId }),
    resetToday: ()=> dispatch({ type:"RESET_TODAY" }),
    hardReset: ()=> dispatch({ type:"HARD_RESET" }),
    state
  }),[state]);

  return <GameCtx.Provider value={actions}>{children}</GameCtx.Provider>;
}
