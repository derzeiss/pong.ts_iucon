import { BAR_WIDTH, BAR_HEIGHT, KEYS, BAR_SPEED, HEIGHT } from './config';
import { Game } from './Game';

const BAR_MAX_Y = HEIGHT - BAR_HEIGHT;

export class Bar {
  public static NAME = 'Bar';

  protected game: Game;
  private x: number;
  private y: number;
  private vx: number;
  private vy: number;

  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  getVx() {
    return this.vx;
  }

  getVy() {
    return this.vy;
  }

  handleInput() {
    if (this.game.is_pressed(KEYS['up'])) {
      this.moveUp();
    } else if (this.game.is_pressed(KEYS['down'])) {
      this.moveDown();
    }
  }

  moveUp() {
    this.vy = -BAR_SPEED;
  }

  moveDown() {
    this.vy = BAR_SPEED;
  }

  dontMove() {
    this.vy = 0;
  }

  update() {
    // update position (inside screen boundaries)
    this.y = Math.min(Math.max(this.y + this.vy, 0), BAR_MAX_Y);
    // reset velocity for next tick
    this.vx = 0;
    this.vy = 0;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.rect(this.x, this.y, BAR_WIDTH, BAR_HEIGHT);
  }
}
