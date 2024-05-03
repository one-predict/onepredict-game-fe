import TokenCollectingGame, { Game } from './game/Game';
import MediaPipePoseTracker, { PoseTracker } from './PoseTracker';
import { NormalizedLandmark } from '@mediapipe/tasks-vision';

export default class GameManager {
  private game: Game = new TokenCollectingGame(30000);
  private poseTracker: PoseTracker = new MediaPipePoseTracker();
  private gameLoopId: number = -1;
  private handler: ((game: Game, gameWindowWidth: number, gameWindowHeight: number) => void) | undefined =
    undefined;
  private onGameStop: ((game: Game) => void) | undefined = undefined;

  public constructor(private videoElement: HTMLVideoElement) {}

  public async startGame() {
    this.game.start();

    await this.poseTracker.initialize();

    this.processGameLoop();
  }

  public subscribeToGameEvent(
    handler: (game: Game, gameWindowWidth: number, gameWindowHeight: number) => void,
  ) {
    this.handler = handler;

    return () => this.stopGame();
  }

  public subscibeToGameStopEvent(handler: (game: Game) => void) {
    this.onGameStop = handler;
  }

  private processGameLoop() {
    this.gameLoopId = requestAnimationFrame(() => {
      if (!this.game.isStarted()) {
        return;
      }

      const gameTime = this.game.startNewGameCycle();
      const aspectRatio = this.videoElement.videoWidth / this.videoElement.videoHeight;

      if (gameTime - this.game.getGameStartTime() > this.game.getGameDuration()) {
        this.stopGame(true);

        return;
      }

      if (this.videoElement.currentTime !== this.game.getLastVideoTime()) {
        const poseTrackingResult = this.poseTracker.trackPose(this.videoElement, gameTime);

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const gameWindowWidth = Math.min(windowWidth, windowHeight * aspectRatio);
        const gameWindowHeight = Math.min(windowWidth / aspectRatio, window.innerHeight);

        const radius = Math.min(gameWindowWidth, gameWindowHeight) * 0.15;

        const [poseLandmarks] = poseTrackingResult.landmarks as NormalizedLandmark[][];

        const filteredPoseLandmarks = poseLandmarks
          ? poseLandmarks.filter((_, index) => {
              return (
                index === 15 ||
                index === 17 ||
                index === 19 ||
                index === 21 ||
                index === 20 ||
                index === 18 ||
                index === 18 ||
                index === 16 ||
                index === 14
              );
            })
          : [];

        const collidedCollectable = this.game.getCollectables().find((collectable) => {
          return filteredPoseLandmarks.some((landmark: NormalizedLandmark) => {
            const landmarkX = (1 - landmark.x) * gameWindowWidth;
            const landmarkY = landmark.y * (gameWindowWidth / aspectRatio);

            const [x, y] = collectable.getCoordinates();

            // Вычисляем расстояние от landmark до центра кружка
            const distance = Math.sqrt((landmarkX - x) ** 2 + (landmarkY - y) ** 2);

            // Проверяем, находится ли landmark внутри кружка
            return distance < radius;
          });
        });

        if (collidedCollectable) {
          this.game.collect(collidedCollectable);
        }

        this.game.tryToGenerateCollectables();
        this.game.checkMissedCollectables();
        this.game.checkTemporaryVisualFeedbacks();
        this.game.setDimensions(gameWindowWidth, gameWindowHeight);
        this.game.setLastPose(poseTrackingResult.landmarks);
        this.game.setLastVideoTime(this.videoElement.currentTime);

        this.handler?.(this.game, gameWindowWidth, gameWindowHeight);
      }

      this.processGameLoop();
    });
  }

  private stopGame(withEvent?: boolean) {
    this.game.stop();

    if (withEvent) {
      this.onGameStop?.(this.game);
    }

    cancelAnimationFrame(this.gameLoopId);
  }
}
