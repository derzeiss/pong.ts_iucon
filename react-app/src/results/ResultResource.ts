import { SimulationResults } from '@derzeiss/pong';
import { URL_API } from '../config';
import { postJson, readJson } from '../util/resource';

const read = () => readJson<SimulationResults>(`${URL_API}/pong`);
const update = () => postJson<void, SimulationResults>(`${URL_API}/pong`);

export const ResultResource = { read, update };
