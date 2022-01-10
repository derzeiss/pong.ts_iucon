import { Game, ais, ScoreArray, SimulationResults } from '@derzeiss/pong';
import fs from 'fs';
import path from 'path';

const NO_OF_SIMULATIONS = 1000;

const getSwappedScore: (results: ScoreArray) => ScoreArray = (results) => [
  results[0],
  results[2],
  results[1],
];

function runSimulations() {
  let results: SimulationResults = {};

  for (let i = 0; i < ais.length; i++) {
    if (i == ais.length - 1) break;
    const p1Class = ais[i];
    console.log('p1', i, p1Class.NAME, p1Class.name, typeof p1Class);

    for (let j = i + 1; j < ais.length; j++) {
      const p2Class = ais[j];
      console.log('p2', i, j, p2Class.NAME, p2Class.name, typeof p2Class);

      const g = new Game(p1Class, p2Class);
      const scores = g.simulate(NO_OF_SIMULATIONS);

      if (!results[p1Class.NAME]) results[p1Class.NAME] = { score: 0, matches: {} };
      if (!results[p2Class.NAME]) results[p2Class.NAME] = { score: 0, matches: {} };

      results[p1Class.NAME].matches[p2Class.NAME] = scores;
      results[p2Class.NAME].matches[p1Class.NAME] = getSwappedScore(scores);
    }
  }
  return results;
}

/**
 * Calculates a score for each result item which is the average number of wins.
 * @param results result data to inject scores to.
 */
function calcScores(results: SimulationResults) {
  Object.keys(results).forEach((p1Name) => {
    const p1Data = results[p1Name];
    const p2Names = Object.keys(p1Data.matches);
    const scoreSum = p2Names.reduce((score, p2Name) => {
      const p2Data = p1Data.matches[p2Name];
      score += p2Data[1];
      return score;
    }, 0);
    const score = scoreSum / p2Names.length;
    p1Data.score = score;
  });
}

function storeResults(results: SimulationResults) {
  const dirPath = path.join(__dirname, '../../data/');
  const filePath = path.join(dirPath, 'results.json');
  fs.mkdirSync(dirPath, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(results));
}
const results = runSimulations();
calcScores(results);
storeResults(results);
