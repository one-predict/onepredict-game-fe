import { IncorrectPositionOverlayDrawer } from '@tap-video-game/drawing/base/IncorrectPositionOverlayDrawer';

export default class CanvasIncorrectPositionOverlayDrawer implements IncorrectPositionOverlayDrawer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  public draw(gameWindowWidth: number, gameWindowHeight: number): void {
    const fontSize = Math.min(gameWindowWidth, gameWindowHeight) * 0.04;

    this.ctx.globalAlpha = 0.5;

    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, gameWindowWidth, gameWindowHeight);

    this.ctx.globalAlpha = 1;

    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.font = `bold ${fontSize}px Orbitron`;

    this.ctx.fillText(
      'You are not in camera bounds.',
      gameWindowWidth * 0.5,
      gameWindowHeight * 0.5,
    );
    this.ctx.fillText(
      'Please move in to camera bounds.',
      gameWindowWidth * 0.5,
      gameWindowHeight * 0.5 + fontSize * 1.5,
    );
  }
}
