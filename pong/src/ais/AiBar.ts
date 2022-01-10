import { Bar } from '../Bar';
import { BALL_SIZE, BAR_HEIGHT } from '../config';

export class LowIntelligenceAIBar extends Bar {
  public static NAME = 'Low Int';

  handleInput() {
    const ball = this.game.ball;
    const ballCenter = ball.getY() + BALL_SIZE / 2;
    const selfCenter = this.getY() + BAR_HEIGHT / 2;
    if (Math.abs(ballCenter - selfCenter) > 5) {
      // prevent ball flickering
      if (ballCenter < selfCenter) {
        this.moveUp();
      } else if (ballCenter > selfCenter) {
        this.moveDown();
      }
    }
  }
}

export class RandomBar extends Bar {
  public static NAME = 'Random';

  handleInput() {
    const random = Math.random();

    if (random < 0.33) return this.moveUp();
    if (random < 0.66) return this.moveDown();
  }
}
