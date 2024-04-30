import {Game} from "../../game/Game.ts";
import {CollectableDrawer} from "./CollectableDrawer.ts";
import {ScoreDrawer} from "./ScoreDrawer.ts";
import TimerDrawer from "./TimerDrawer.ts";

export interface TemporaryVisualFeedbackDrawer {
  draw(game: Game): void;
}

export default abstract class BaseGameDrawer {
  private collectableDrawer: CollectableDrawer;
  private scoreDrawer: ScoreDrawer;
  private timerDrawer: TimerDrawer;

  protected constructor() {
    this.collectableDrawer = this.createCollectableDrawer();
    this.scoreDrawer = this.createScoreDrawer();
    this.timerDrawer = this.createTimerDrawer();
  }

  protected abstract createCollectableDrawer(): CollectableDrawer;
  protected abstract createScoreDrawer(): ScoreDrawer;
  protected abstract createTimerDrawer(): TimerDrawer;

  public draw(game: Game) {
    const [gameWindowWidth, gameWindowHeight] = game.getDimensions();

    game.getCollectables().forEach((collectable) => {
      this.collectableDrawer.draw(collectable, gameWindowWidth, gameWindowHeight, game.getCurrentGameTime());
    });

    this.scoreDrawer.draw(game.getScore(), gameWindowWidth, gameWindowHeight);
    this.timerDrawer.draw((game.getCurrentGameTime() - game.getGameStartTime()) / 1000, gameWindowWidth, gameWindowHeight);
  }
}
