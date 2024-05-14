import { DrawingUtils, NormalizedLandmark } from '@mediapipe/tasks-vision';
import { LandmarksDrawer } from '@boosting-game/drawing/base/LandmarksDrawer';

export default class CanvasLandmarksDrawer implements LandmarksDrawer {
  private drawingUtils: DrawingUtils;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.drawingUtils = new DrawingUtils(this.ctx);
  }

  public draw(landmarks: NormalizedLandmark[]): void {
    this.drawingUtils.drawLandmarks(landmarks);
  }
}
