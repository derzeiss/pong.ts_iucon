import { AdrianAi } from "./ais/AdrianAi";
import { LowIntelligenceAIBar } from "./ais/AiBar";
import { AlexAi } from "./ais/AlexAi";
import { ErhardAi } from "./ais/ErhardAi";
import { JulianeAi } from "./ais/JulianeAi";
import { MalteAi } from "./ais/MalteAi";
import { MichiAi } from "./ais/MichiAi";
import { Bar } from "./Bar";
import { Game } from "./Game";
import { ScoreArray, SimulationResults } from "./types";

// package exports
const ais: typeof Bar[] = [
  AdrianAi,
  AlexAi,
  ErhardAi,
  JulianeAi,
  MalteAi,
  MichiAi,
];

export {
  Game,
  // data
  ais,
  // types
  SimulationResults,
  ScoreArray,
};

(() => {
  // start game if we are inside the browser
  if (typeof document === "undefined") return;

  const g = new Game(Bar, LowIntelligenceAIBar, "game-canvas");
  //console.log(g.simulate(1000));  // comment in this line to simulate 1000 games between these two classes before actually starting a game
  g.run();
})();
