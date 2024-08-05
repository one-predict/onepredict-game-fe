import EventEmitter from 'eventemitter3';
import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import TapVideoGameStatus from '@app/enums/TapVideoGameStatus';
import MediaPipePoseTracker, { PoseTracker } from './PoseTracker';
import DefaultTapVideoGame, { TapVideoGame, GamePose } from './TapVideoGame';

type GameManagerEvent = 'tick' | 'status-change';

export default class TapVideoGameManager {
  private readonly game: TapVideoGame = new DefaultTapVideoGame(30000);
  private poseTracker: PoseTracker = new MediaPipePoseTracker();
  private gameLoopId: number = -1;

  private eventEmitter = new EventEmitter();

  private unsubscribeGameStatusChangeEvent?: () => void;

  private incorrectCameraBoundsCounter = 0;

  public constructor(private videoElement: HTMLVideoElement) {}

  public async initialize() {
    this.game.setStatus(TapVideoGameStatus.Initialization);

    this.unsubscribeGameStatusChangeEvent = this.game.subscribe('status-change', () => {
      this.eventEmitter.emit('status-change', this.game);
    });

    await this.poseTracker.initialize();

    this.processGameLoop();
  }

  public subscribe(event: GameManagerEvent, callback: (game: TapVideoGame) => void) {
    this.eventEmitter.on(event, callback);

    return () => this.eventEmitter.off(event, callback);
  }

  private processGameLoop() {
    this.gameLoopId = requestAnimationFrame(async () => {
      this.game.startNewGameCycle();

      switch (this.game.getStatus()) {
        case TapVideoGameStatus.Setup: {
          if (this.game.getIsPersonInCameraBounds()) {
            this.game.setStatus(TapVideoGameStatus.Preparation);
          }

          break;
        }
        case TapVideoGameStatus.Preparation: {
          if (this.game.getCurrentStatusTime() > 3000) {
            this.game.setStatus(TapVideoGameStatus.Playing);
          }

          break;
        }
        case TapVideoGameStatus.Playing: {
          if (this.game.getCurrentStatusTime() > this.game.getGameDuration()) {
            this.game.setStatus(TapVideoGameStatus.Finished);
          }

          break;
        }
        case TapVideoGameStatus.Stopped: {
          return;
        }
      }

      const aspectRatio = this.videoElement.videoWidth / this.videoElement.videoHeight;

      if (this.videoElement.currentTime !== this.game.getCurrentVideoTime()) {
        const poseTrackingResult = await this.poseTracker.trackPose(this.videoElement, performance.now());

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const gameWindowWidth = Math.min(windowWidth, windowHeight * aspectRatio);
        const gameWindowHeight = Math.min(windowWidth / aspectRatio, window.innerHeight);

        const [poseLandmarks] = poseTrackingResult.landmarks as NormalizedLandmark[][];

        const pose = poseLandmarks ? this.getPoseFromLandmarks(poseLandmarks) : undefined;

        if (pose) {
          this.checkIfPersonInCameraBounds(pose);
        }

        this.game.setDimensions(gameWindowWidth, gameWindowHeight);
        this.game.setCurrentGamePose(pose);
        this.game.setCurrentVideoTime(this.videoElement.currentTime);

        if (pose && this.game.getStatus() === TapVideoGameStatus.Playing) {
          this.processHandLandmarks(pose.hands);
        }

        if (this.game.getStatus() === TapVideoGameStatus.Playing) {
          this.game.tryToGenerateCollectables(aspectRatio);
          this.game.checkMissedCollectables();
          this.game.checkTemporaryVisualFeedbacks();
        }

        this.eventEmitter.emit('tick', this.game);

        if (this.game.getStatus() === TapVideoGameStatus.Initialization) {
          this.game.setStatus(TapVideoGameStatus.Setup);
        }
      }

      this.processGameLoop();
    });
  }

  public stopGame() {
    this.game.setStatus(TapVideoGameStatus.Stopped);

    cancelAnimationFrame(this.gameLoopId);

    this.unsubscribeGameStatusChangeEvent?.();
  }

  private checkIfPersonInCameraBounds(pose: GamePose) {
    const isPersonInCameraBounds = pose.body.every((landmark) => {
      return (
        landmark.x > 0.05 && landmark.x < 0.95 && landmark.y > 0.05 && landmark.y < 0.95 && landmark.visibility > 0.7
      );
    });

    const isStateChanged = isPersonInCameraBounds !== this.game.getIsPersonInCameraBounds();

    if (isStateChanged) {
      this.incorrectCameraBoundsCounter++;
    }

    if (this.incorrectCameraBoundsCounter > 10) {
      this.incorrectCameraBoundsCounter = 0;
      this.game.setIsPersonInCameraBounds(isPersonInCameraBounds);
    }
  }

  private processHandLandmarks(handLandmarks: NormalizedLandmark[]) {
    const [gameWindowWidth, gameWindowHeight] = this.game.getDimensions();
    const gridCellSize = this.game.getGridCellSize();

    const gridCellsInRow = Math.round(gameWindowWidth / gridCellSize);

    const bannedGridCells = new Set<number>();

    handLandmarks.forEach((handLandmark) => {
      const handLandmarkX = handLandmark.x * gameWindowWidth;
      const handLandmarkY = handLandmark.y * gameWindowHeight;

      const gridCellRow = Math.floor(handLandmarkY / gridCellSize);
      const gridCellColumn = Math.floor(handLandmarkX / gridCellSize);

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          bannedGridCells.add((gridCellRow + dx) * gridCellsInRow + (gridCellColumn + dy));
        }
      }

      if (!this.game.getIsPersonInCameraBounds()) {
        return;
      }

      for (const collectable of this.game.getCollectables().values()) {
        const [collectableX, collectableY] = collectable.getCoordinates();

        const distance = Math.sqrt((handLandmarkX - collectableX) ** 2 + (handLandmarkY - collectableY) ** 2);

        if (distance < collectable.getRadius()) {
          this.game.collect(collectable);
        }
      }
    });

    this.game.setBannedGridCells(bannedGridCells);
  }

  private getPoseFromLandmarks(landmarks: NormalizedLandmark[]): GamePose {
    return {
      hands: this.mirrorLandmarks([
        landmarks[18],
        landmarks[20],
        landmarks[22],
        landmarks[16],
        landmarks[17],
        landmarks[19],
        landmarks[21],
        landmarks[15],
      ]),
      body: this.mirrorLandmarks([
        landmarks[0],
        landmarks[12],
        landmarks[11],
        landmarks[24],
        landmarks[23],
        landmarks[28],
        landmarks[27],
      ]),
    };
  }

  private mirrorLandmarks(landmarks: NormalizedLandmark[]) {
    return landmarks.map((landmark) => ({
      ...landmark,
      x: 1 - landmark.x,
    }));
  }
}
