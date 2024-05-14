import { BoostingGame } from '@boosting-game/BoostingGame';
import { CollectableDrawer } from './CollectableDrawer';
import { ScoreDrawer } from './ScoreDrawer';
import TimerDrawer from './TimerDrawer';

export interface TemporaryVisualFeedbackDrawer {
  draw(game: BoostingGame): void;
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

  public draw(game: BoostingGame) {
    const [gameWindowWidth, gameWindowHeight] = game.getDimensions();

    game.getCollectables().forEach((collectable) => {
      this.collectableDrawer.draw(
        collectable,
        game.getCurrentGameTime(),
      );
    });

    this.scoreDrawer.draw(game.getScore(), gameWindowWidth, gameWindowHeight);
    this.timerDrawer.draw(
      (game.getCurrentGameTime() - game.getGameStartTime()) / 1000,
      gameWindowWidth,
      gameWindowHeight,
    );
  }
}
