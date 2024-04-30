import BaseGameDrawer, {GameDrawer} from "../base/GameDrawer.ts";
import CanvasCollectableDrawer from "./CanvasCollectableDrawer.ts";
import CanvasScoreDrawer from "./CanvasScoreDrawer.ts";
import CanvasTimerDrawer from "./CanvasTimerDrawer.ts";

export default class CanvasGameDrawer extends BaseGameDrawer implements GameDrawer {
  constructor(
    ctx: CanvasRenderingContext2D,
  ) {
    super(
      new CanvasCollectableDrawer(ctx),
      new CanvasScoreDrawer(ctx),
      new CanvasTimerDrawer(ctx),
    );
  }
}
