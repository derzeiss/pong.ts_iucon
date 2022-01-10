export interface IGameObject {
  handleInput: () => void;
  update: () => void;
  render: (ctx: CanvasRenderingContext2D) => void;
}

// SIMULATION RESULTS
// ----
export type SimulationResults = {
  [barName: string]: {
    score: number;
    matches: {
      [barName: string]: ScoreArray;
    };
  };
};

export type ScoreArray = [draws: number, wins: number, losses: number];