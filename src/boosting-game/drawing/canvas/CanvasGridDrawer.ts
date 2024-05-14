import { GridDrawer } from '@boosting-game/drawing/base/GridDrawer';

export default class CanvasGridDrawer implements GridDrawer {
  constructor(private ctx: CanvasRenderingContext2D) {}

  public draw(gameWindowWidth: number, gameWindowHeight: number, gridCellSize: number, bannedGridCells: Set<number>): void {
    this.ctx.strokeStyle = '#ccc';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();

    const gridCellsInRow = Math.round(gameWindowWidth / gridCellSize);

    for (const bannedGridCell of bannedGridCells) {
      const [row, column] = [
        Math.floor(bannedGridCell / gridCellsInRow),
        bannedGridCell % gridCellsInRow,
      ];

      const rectX = column * gridCellSize;
      const rectY = row * gridCellSize;

      this.ctx.fillStyle = 'red';
      this.ctx.globalAlpha = 0.5;

      this.ctx.fillRect(rectX, rectY, gridCellSize, gridCellSize);

      this.ctx.globalAlpha = 1;
    }

    for (let x = 0; x <= gameWindowWidth; x += gridCellSize) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, gameWindowHeight);
    }

    for (let y = 0; y <= gameWindowHeight; y += gridCellSize) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(gameWindowWidth, y);
    }

    this.ctx.stroke();
  }
}
