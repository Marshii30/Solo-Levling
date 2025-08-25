import React, { useState } from "react";
import RoutesView from "./routes";
import { GameStateProvider } from "../providers/GameStateProvider";
import { SfxProvider } from "../providers/SfxProvider";
import SceneBackground from "../components/SceneBackground";
import HUD from "../components/HUD";
import BootOverlay from "../components/BootOverlay";

export default function App(){
  const [booted, setBooted] = useState(false);
  return (
    <SfxProvider>
      <GameStateProvider>
        <SceneBackground/>
        <HUD/>
        {!booted && <BootOverlay onDone={()=>setBooted(true)}/> }
        {booted && <RoutesView/>}
      </GameStateProvider>
    </SfxProvider>
  );
}
