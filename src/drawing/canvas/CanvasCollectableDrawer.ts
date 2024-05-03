import { Collectable } from '../../game/Collectable';
import { CollectableDrawer } from '../base/CollectableDrawer';

export default class CanvasCollectableDrawer implements CollectableDrawer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  public draw(
    collectable: Collectable,
    gameWindowWidth: number,
    gameWindowHeight: number,
    currentGameTime: number,
  ): void {
    const [x, y] = collectable.getCoordinates();

    const collectableRadius = collectable.getRadius(gameWindowWidth, gameWindowHeight);

    const image = new Image();

    image.src = collectable.getImage();

    this.ctx.drawImage(image, x, y, collectableRadius, collectableRadius);

    const passed =
      1 - (currentGameTime - collectable.getGenerationTime()) / collectable.getCollectionThreshold();

    this.ctx.beginPath();
    this.ctx.arc(
      x + collectableRadius / 2,
      y + collectableRadius / 2,
      collectableRadius / 2,
      0,
      Math.PI * 2 * 2,
    );

    this.ctx.globalAlpha = 0.4;
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'black';

    this.ctx.stroke();
    this.ctx.closePath();
    this.ctx.beginPath();

    this.ctx.globalAlpha = 1;

    this.ctx.arc(
      x + collectableRadius / 2,
      y + collectableRadius / 2,
      collectableRadius / 2,
      -Math.PI / 2,
      -Math.PI / 2 + Math.PI * 2 * passed,
    );

    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
