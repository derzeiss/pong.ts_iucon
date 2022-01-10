import { NextFunction, Request, Response, Router } from 'express';
import { promises as fsPromises } from 'fs';
import path from 'path';
import { runScript } from '../utility/runScript';

export const pongRouter = Router();

///////////////////////////////
// ROUTES

pongRouter.get('/', async (_req, res, next) => {
  getResultsAsync()
    .then((data) => res.json(data))
    .catch(next);
});

pongRouter.post('/', async (_req, res, next) => {
  updatePongSimulationResultsAsync()
    .then(() => {
      getResultsAsync()
        .then((data) => res.json(data))
        .catch(next);
    })
    .catch(next);
});

///////////////////////////////
// BEHAVIOR

async function updatePongSimulationResultsAsync() {
  const pathUpdatePackage = path.join(__dirname, '../scripts/update-pong-package');
  const pathRunSimulations = path.join(__dirname, '../scripts/run-pong-simulations');

  await runScript(pathUpdatePackage);
  await runScript(pathRunSimulations);
}

async function getResultsAsync() {
  const filepath = path.join(__dirname, '../../data/results.json');
  const data = await fsPromises.readFile(filepath);
  return JSON.parse(data.toString());
}

///////////////////////////////
// HELPERS
