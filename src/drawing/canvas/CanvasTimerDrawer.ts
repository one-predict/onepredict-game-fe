import TimerDrawer from "../base/TimerDrawer.ts";

export default class CanvasTimerDrawer implements TimerDrawer {
  constructor(
    private ctx: CanvasRenderingContext2D,
  ) {}

  public draw(timer: number, gameWindowWidth: number, gameWindowHeight: number): void {
    const rectangleWidth = gameWindowWidth * 0.3;
    const rectangleHeight = gameWindowHeight * 0.15;

    const rectangleX = gameWindowWidth - rectangleWidth - 10; // отступ слева на 10px
    const rectangleY = 10; // отступ сверху на 10px

    if (timer < 10) {
      this.ctx.strokeStyle = "rgb(255, 0, 0)";
      this.ctx.fillStyle = "rgba(255, 0, 0, .5)";
    } else {
      this.ctx.strokeStyle = "rgb(0, 0, 0)";
      this.ctx.fillStyle = "rgba(0, 0, 0, .5)";
    }

    this.ctx.beginPath();
    this.ctx.roundRect(rectangleX, rectangleY, rectangleWidth, rectangleHeight, 20);
    this.ctx.stroke();
    this.ctx.fill();

    const fontSize = Math.min(gameWindowWidth, gameWindowHeight) * 0.1;

    this.ctx.fillStyle = "white";
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = "middle"; // Вертикальное центрирование текста
    this.ctx.font = `bold ${fontSize}px Arial`; // Жирный шрифт размером 16px

    // Рендеринг текста таймера на канвасе
    this.ctx.fillText(`00:${Math.max(timer, 0)}`, rectangleX + rectangleWidth / 2, rectangleY + rectangleHeight / 2);
  }
}
