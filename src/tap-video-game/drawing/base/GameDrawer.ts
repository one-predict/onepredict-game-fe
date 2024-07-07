import { TapVideoGame } from '@tap-video-game/TapVideoGame';
import TapVideoGameStatus from '@app/enums/TapVideoGameStatus';
import { LandmarksDrawer } from '@tap-video-game/drawing/base/LandmarksDrawer';
import { PreparingTimerDrawer } from './PreparingTimerDrawer';
import { IncorrectPositionOverlayDrawer } from './IncorrectPositionOverlayDrawer';
import { CollectableDrawer } from './CollectableDrawer';
import { ScoreDrawer } from './ScoreDrawer';
import TimerDrawer from './TimerDrawer';
import { GridDrawer } from './GridDrawer';

export interface GameDrawer {
  draw(game: TapVideoGame): void;
}

export default abstract class BaseGameDrawer {
  protected constructor(
    private collectableDrawer: CollectableDrawer,
    private scoreDrawer: ScoreDrawer,
    private timerDrawer: TimerDrawer,
    private preparingTimerDrawer: PreparingTimerDrawer,
    private incorrectPositionOverlayDrawer: IncorrectPositionOverlayDrawer,
    private gridDrawer: GridDrawer,
    private landmarksDrawer: LandmarksDrawer,
  ) {}

  public draw(game: TapVideoGame) {
    const [gameWindowWidth, gameWindowHeight] = game.getDimensions();

    if (game.isDevModeEnabled()) {
      this.gridDrawer.draw(gameWindowWidth, gameWindowHeight, game.getGridCellSize(), game.getBannedGridCells());
      this.landmarksDrawer.draw(game.getCurrentGamePose()?.hands || []);
    }

    if (game.getStatus() === TapVideoGameStatus.Preparation) {
      const timeLeft = Math.ceil((3000 - game.getCurrentStatusTime()) / 1000);

      this.preparingTimerDrawer.draw(
        Math.ceil(timeLeft),
        gameWindowWidth,
        gameWindowHeight,
      );

      return;
    }

    if (game.getStatus() === TapVideoGameStatus.Playing) {
      const timeLeft = (game.getGameDuration() - game.getCurrentStatusTime()) / 1000;

      this.scoreDrawer.draw(game.getScore(), gameWindowWidth, gameWindowHeight);
      this.timerDrawer.draw(Math.ceil(timeLeft), gameWindowWidth, gameWindowHeight);

      game.getCollectables().forEach((collectable) => {
        this.collectableDrawer.draw(collectable, game.getCurrentGameTime());
      });
    }

    if (!game.getIsPersonInCameraBounds()) {
      this.incorrectPositionOverlayDrawer.draw(
        gameWindowWidth,
        gameWindowHeight,
      );
    }
  }
}
