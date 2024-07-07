import { Collectable } from '@tap-video-game/collectables/Collectable';
import { CollectableDrawer } from '@tap-video-game/drawing/base/CollectableDrawer';

export default class CanvasCollectableDrawer implements CollectableDrawer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  public draw(
    collectable: Collectable,
    currentGameTime: number,
  ): void {
    const [x, y] = collectable.getCoordinates();
    const collectableRadius = collectable.getRadius();

    const image = new Image();

    image.src = collectable.getImage();

    const imageX = x - collectableRadius / 2;
    const imageY = y - collectableRadius / 2;

    this.ctx.drawImage(
      image,
      imageX,
      imageY,
      collectableRadius,
      collectableRadius,
    );

    const passed = 1 - (currentGameTime - collectable.getGenerationTime()) / collectable.getCollectionThreshold();

    this.ctx.beginPath();
    this.ctx.arc(x, y, collectableRadius / 2, 0, Math.PI * 2);
    this.ctx.globalAlpha = 0.4;
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.beginPath();
    this.ctx.globalAlpha = 1;

    this.ctx.arc(
      x,
      y,
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
