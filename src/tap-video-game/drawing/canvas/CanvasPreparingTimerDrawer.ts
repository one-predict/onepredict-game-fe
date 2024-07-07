import { PreparingTimerDrawer } from '@tap-video-game/drawing/base/PreparingTimerDrawer';

export default class CanvasPreparingTimerDrawer implements PreparingTimerDrawer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  public draw(
    left: number,
    gameWindowWidth: number,
    gameWindowHeight: number,
  ): void {
    const fontSize = Math.min(gameWindowWidth, gameWindowHeight) * 0.3;

    this.ctx.globalAlpha = 0.5;

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, gameWindowWidth, gameWindowHeight);

    this.ctx.globalAlpha = 1;

    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = `bold ${fontSize}px Orbitron`;

    this.ctx.fillText(
      left.toString(),
      gameWindowWidth * 0.5,
      gameWindowHeight * 0.5,
    );
  }
}
