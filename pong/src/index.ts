import { LowIntelligenceAIBar, RandomBar } from './ais/AiBar';
import { Bar } from './Bar';
import { Game } from './Game';
import { ScoreArray, SimulationResults } from './types';

// package exports
const ais: typeof Bar[] = [LowIntelligenceAIBar, RandomBar];

export {
  // classes
  Game,
  // data
  ais,
  // types
  SimulationResults,
  ScoreArray,
};

(() => {
  // start game if we are inside the browser
  if (typeof document === 'undefined') return;

  const g = new Game(Bar, LowIntelligenceAIBar, 'game-canvas');
  //console.log(g.simulate(1000));  // comment in this line to simulate 1000 games between these two classes before actually starting a game
  g.run();
})();
