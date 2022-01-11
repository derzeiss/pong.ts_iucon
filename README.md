# pong.ts

Pong game written in Typescript. You can write your own AIs and let them compete against each other, either live or in simulations. Also features an online Dashboard where you can view your results.

# Part I: The pong game

All following instructions are related to the pong game and assume you are in `~/pong` when running bash-commands.  
For instructions on the dashboard see [Part II: AI competition Dashboard](#part-ii-ai-competition-dashboard).

## Installation

```bash
npm install
```

## Usage

If you just want to play a game of pong or implement your pong AI locally, run

```bash
npm start
```

This will install all required packages and spin up a dev server on `http://localhost:8080`, so you can start playing around.

## Implementing a new AI

## Add your AI to the repo

First create a new `.ts` file in `~/pong/ais` exporting a class that extends `Bar` containing

- A `public static NAME` prop. That's the bars name displayed in the dashboard.
- A `handleInput()` method. This method calculates what to do (where to move) each frame

Example:

```ts
export class MyAiBar extends Bar {
  // Bar name displayed in the dashboard
  public static NAME = 'My AI Bar';

  handleInput() {
    // calc where to move this frame
  }
}
```

To include this class in the dashboard and game simulations add this class to the `ais` array in `~/pong/index.ts` so it's exported.

### Implement your `handleInput()` method

Below is a list of all properties you can access in your own AI.

```ts
handleInput() {
  // constant information (exported from config)
  WIDTH; // game window width
  HEIGHT; // game window height
  BAR_WIDTH; // bar width in px
  BAR_HEIGHT; // bar height in px
  BALL_SIZE; // ball size (width & height) in px

  // ball information
  const ball = this.game.ball; // get the ball object
  ball.getX(); // x position (left border)
  ball.getY(); // y position (upper border)
  ball.getVx(); // speed in x direction in px/frame
  ball.getVy(); // speed in y direction in px/frame

  // bar information
  this; // this bar
  this.getX(); // x position (left border)
  this.getY(); // y position (upper border)
  this.getVx(); // speed in x direction in px/frame (should be 0)
  this.getVy(); // speed in y-direction in px/frame

  // bar behavior
  // the last method you call is what your bar will du this frame. In this example the bar won't move
  this.moveUp(); // move up this frame (won't stack)
  this.moveDown(); // move down this frame (won't stack)
  this.dontMove(); // don't move this frame
}
```

### Test / Play against your AI

To test or to play against your AI go into `~/pong/Game.ts` and search for

```ts
const g = new Game(Bar, LowIntelligenceAIBar);
```

The Game constructor takes two `Bar` classes as parameters. Pass in `Bar` to play yourself or any other Bar-AI class. To play against our newly created AI this line should look like this (Be sure your class is imported in this file):

```ts
const g = new Game(Bar, MyAiBar);
```

If you want to test your AI against the default AI Bar go with this one

```ts
const g = new Game(MyAiBar, LowIntelligenceAIBar);
```

After instantiating the game you can either call `simulate(numberOfGames:number) -> [drafts: number, winsP1: number, winsP2: number]` which will simulate the given number of games and return the results or `run()` which will start a new human-playable game.

### Share your AI with your team / show it in the distributed dashboard

Just push your changes to the repo to make it available for your team and to run simulations against them.

# Part II: AI competition Dashboard

## Installation

```bash
cd server
npm install

cd ../react-app
npm install
```

## Usage

```bash
# build local pong npm package
# as the other projects are depend on this package this must be built first.
cd pong
npm run package

# build dashboard frontend app
cd ../react-app
npm run build

# build dashboard backend
cd ../server
npm run build
node dist/index.js
```

This will start a local dashboard at `http://localhost:3001`.

## Development

### Starting dev instances

If you are in a dev environment you need to set NODE_ENV to development to enable cors. To do this, create `~/server/.env` and insert `NODE_ENV=development`.

After this you can start a dev instance of the server featuring auto compile and restart using

```bash
cd ~/server
npm start
```

In parallel you can start the frontend in another process in dev mode.

```bash
cd ~/react-app
npm start
```

### How the process works

When you click "update results" in the dashboard there are a couple of things that happen.

1. Frontend sends a request to the backend, requesting a result update.
2. The backend runs `~/server/scripts/update-pong-package`. This script pulls the latest changes from the repo and rebuilds the local pong npm package, so all (new) AIs are included in the package
3. After finishing the update, `~/server/scripts/run-pong-simulations` is run. This script iterates over all available AIs and runs 1000 game simulations between each of them. The number of simulations between to AIs can be configured in `~/server/scripts/run-pong-simulations -> NO_OF_SIMULATIONS`. The results are saved in a local JSON file on the server in `~/server/data/results.json`.
4. These results are then returned to the client.
