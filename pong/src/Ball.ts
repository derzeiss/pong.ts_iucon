import { Bar } from './Bar';
import { BALL_ACC, BALL_SIZE, BALL_SPEED_X_MIN, BALL_SPEED_Y_MAX, BAR_HEIGHT, BAR_SPEED, BAR_WIDTH, HEIGHT, WIDTH } from './config';
import { Game } from './Game';
import { randint } from './util';

const BALL_MAX_Y = HEIGHT - BALL_SIZE;
const BALL_MAX_X = WIDTH - BALL_SIZE;
export class Ball {
  private game: Game;
  private x: number;
  private y: number;
  private lastX: number;
  private lastY: number;
  private vx: number;
  private vy: number;
  private justBounced: boolean; // true if the ball bounced last frame. Disables bar collision detection for one frame

  constructor(game: Game, x = 0, y = 0) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.lastX = x;
    this.lastY = y;
    this.vx = 0;
    this.vy = 0;
    this.justBounced = false;
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

  handleInput() {}

  update() {
    // update position
    this.lastX = this.x;
    this.lastY = this.y;
    this.x += this.vx;
    this.y += this.vy;

    this.handleCollisionsWithFriendlyWalls();
    this.handleCollisionsWithBars();
    this.handleCollisionsWithPointyWalls();
  }

  /**
   * Check if ball collided on top or bot -> bounce from wall
   */
  private handleCollisionsWithFriendlyWalls() {
    if (this.y < 0) {
      // collided top
      this.y = 0;
      this.vy *= -1;
    } else if (this.y > BALL_MAX_Y) {
      // collided bottom
      this.y = BALL_MAX_Y;
      this.vy *= -1;
    }
  }

  /** 
   * check if ball hit screen bounds left or right -> score
   */
  private handleCollisionsWithPointyWalls() {
    if (0 >= this.x) {
      // collided left
      if (!this.game.scorePlayer2.addScore()) {
        this.respawn(1);
      }
    } else if (this.x >= BALL_MAX_X) {
      if (!this.game.scorePlayer1.addScore()) {
        this.respawn(-1);
      }
    }
  }

  private handleCollisionsWithBars() {
    if (this.justBounced) {
      this.justBounced = false;
      return;
    }

    const p1 = this.game.player1;
    const p1x = p1.getX() + BAR_WIDTH;
    const p1y0 = p1.getY();
    const p1y1 = p1y0 + BAR_HEIGHT;

    const p2 = this.game.player2;
    const p2x = p2.getX() - BALL_SIZE; // make left bar side collide with right ball side
    const p2y0 = p2.getY();
    const p2y1 = p2y0 + BAR_HEIGHT;

    if (this.collidedWithBar(p1x, p1y0, p1y1)) {
      this.x = p1x;
      this.bounceFromPlayer(this.game.player1);
    } else if (this.collidedWithBar(p2x, p2y0, p2y1)) {
      this.x = this.game.player2.getX() - BALL_SIZE;
      this.bounceFromPlayer(this.game.player2);
    }
  }

  private collidedWithBar(barX: number, barY0: number, barY1: number) {
    const averageY = (this.lastY + this.y) / 2;
    if (averageY + BALL_SIZE < barY0) return false; // ball is over the bar
    if (averageY > barY1) return false; // ball is beneath the bar
    if (Math.sign(barX - this.x) === Math.sign(barX - this.lastX)) return false; // ball didn't travel through bar last frame
    return true;
  }

  private bounceFromPlayer(player: Bar) {
    this.vx = -(this.vx * BALL_ACC);
    this.vy = ((this.y - player.getY()) / BAR_HEIGHT) * BALL_SPEED_Y_MAX - BALL_SPEED_Y_MAX / 2;
    this.justBounced = true;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.rect(this.x, this.y, BALL_SIZE, BALL_SIZE);
  }

  private getRandomDirection() {
    if (Math.random() < 0.5) return -1;
    return 1;
  }

  respawn(direction = 0) {
    if (direction == 0) {
      direction = this.getRandomDirection();
    }
    this.x = WIDTH / 2;
    this.y = HEIGHT / 2;
    this.vx = BALL_SPEED_X_MIN * direction;
    this.vy = randint(-BALL_SPEED_Y_MAX, BALL_SPEED_Y_MAX);
  }
}
