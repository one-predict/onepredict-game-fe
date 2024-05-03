import { Game } from '../../game/Game';
import { CollectableDrawer } from './CollectableDrawer';
import { ScoreDrawer } from './ScoreDrawer';
import TimerDrawer from './TimerDrawer';

export interface GameDrawer {
  draw(game: Game): void;
}

export default abstract class BaseGameDrawer {
  protected constructor(
    private collectableDrawer: CollectableDrawer,
    private scoreDrawer: ScoreDrawer,
    private timerDrawer: TimerDrawer,
  ) {}

  public draw(game: Game) {
    const [gameWindowWidth, gameWindowHeight] = game.getDimensions();

    game.getCollectables().forEach((collectable) => {
      this.collectableDrawer.draw(collectable, gameWindowWidth, gameWindowHeight, game.getCurrentGameTime());
    });

    const timeLeft = (game.getGameDuration() - (game.getCurrentGameTime() - game.getGameStartTime())) / 1000;

    this.scoreDrawer.draw(game.getScore(), gameWindowWidth, gameWindowHeight);
    this.timerDrawer.draw(Math.ceil(timeLeft), gameWindowWidth, gameWindowHeight);
  }
}
