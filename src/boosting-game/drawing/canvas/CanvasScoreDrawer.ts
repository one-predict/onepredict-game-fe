import { ScoreDrawer } from '@boosting-game/drawing/base/ScoreDrawer';

export default class CanvasScoreDrawer implements ScoreDrawer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  public draw(
    score: number,
    gameWindowWidth: number,
    gameWindowHeight: number,
  ): void {
    const rectangleWidth = gameWindowWidth * 0.17;
    const rectangleHeight = gameWindowHeight * 0.13;

    const fontSize = Math.min(gameWindowWidth, gameWindowHeight) * 0.08;

    const rectangleX = 10;
    const rectangleY = 10;

    this.ctx.strokeStyle = 'rgb(0, 0, 0)';
    this.ctx.fillStyle = 'rgba(0, 0, 0, .5)';

    this.ctx.beginPath();
    this.ctx.roundRect(
      rectangleX,
      rectangleY,
      rectangleWidth,
      rectangleHeight,
      20,
    );
    this.ctx.stroke();
    this.ctx.fill();

    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = `bold ${fontSize}px Orbitron`;

    this.ctx.fillText(
      score.toString(),
      rectangleX + rectangleWidth / 2,
      rectangleY + rectangleHeight / 2,
    );
  }
}
