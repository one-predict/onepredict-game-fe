import BaseGameDrawer, {
  GameDrawer,
} from '@tap-video-game/drawing/base/GameDrawer';
import CanvasCollectableDrawer from './CanvasCollectableDrawer';
import CanvasScoreDrawer from './CanvasScoreDrawer';
import CanvasTimerDrawer from './CanvasTimerDrawer';
import CanvasPreparingTimerDrawer from './CanvasPreparingTimerDrawer';
import CanvasIncorrectPositionOverlayDrawer from './CanvasIncorrectPositionOverlayDrawer';
import CanvasGridDrawer from './CanvasGridDrawer';
import CanvasLandmarksDrawer from './CanvasLandmarksDrawer';

export default class CanvasGameDrawer extends BaseGameDrawer implements GameDrawer {
  constructor(ctx: CanvasRenderingContext2D) {
    super(
      new CanvasCollectableDrawer(ctx),
      new CanvasScoreDrawer(ctx),
      new CanvasTimerDrawer(ctx),
      new CanvasPreparingTimerDrawer(ctx),
      new CanvasIncorrectPositionOverlayDrawer(ctx),
      new CanvasGridDrawer(ctx),
      new CanvasLandmarksDrawer(ctx),
    );
  }
}
