import BaseGameDrawer, { GameDrawer } from '../base/GameDrawer';
import CanvasCollectableDrawer from './CanvasCollectableDrawer';
import CanvasScoreDrawer from './CanvasScoreDrawer';
import CanvasTimerDrawer from './CanvasTimerDrawer';

export default class CanvasGameDrawer extends BaseGameDrawer implements GameDrawer {
  constructor(ctx: CanvasRenderingContext2D) {
    super(new CanvasCollectableDrawer(ctx), new CanvasScoreDrawer(ctx), new CanvasTimerDrawer(ctx));
  }
}
