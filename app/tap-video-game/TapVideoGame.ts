import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import EventEmitter from 'eventemitter3';
import TapVideoGameStatus from '@app/enums/TapVideoGameStatus';
import { Collectable } from './collectables/Collectable';
import Coin from './collectables/Coin';
import Bomb from './collectables/Bomb';
import { TemporaryVisualFeedback } from './TemporaryVisualFeedback';
import { GameVisualFeedbackAttributes } from './feedback-attributes/GameVisualFeedbackAttributes';

export interface GamePose {
  hands: NormalizedLandmark[];
  body: NormalizedLandmark[];
}

export type GameEventType = 'status-change';

export type GameEventHandlers = {
  'status-change': (status: TapVideoGameStatus) => void;
};

export interface TapVideoGame {
  subscribe<Type extends GameEventType>(event: Type, callback: GameEventHandlers[Type]): () => void;
  start(): void;
  startNewGameCycle(): number;
  collect(collectable: Collectable): void;
  tryToGenerateCollectables(aspectRation: number): void;
  setScore(score: number): void;
  setStatus(status: TapVideoGameStatus): void;
  setDimensions(width: number, height: number): void;
  setCurrentGamePose(pose: GamePose | undefined): void;
  setCurrentVideoTime(time: number): void;
  setBannedGridCells(cells: Set<number>): void;
  setIsPersonInCameraBounds(value: boolean): void;
  getCurrentStatusTime(): number;
  getGameStartTime(): number;
  getCurrentGameTime(): number;
  getGameDuration(): number;
  getBannedGridCells(): Set<number>;
  getStatus(): TapVideoGameStatus;
  getCurrentGamePose(): GamePose | undefined;
  getScore(): number;
  getGridCellSize(): number;
  getCollectables(): Map<string, Collectable>;
  getIsPersonInCameraBounds(): boolean;
  checkTemporaryVisualFeedbacks(): void;
  checkMissedCollectables(): void;
  getCurrentVideoTime(): number;
  getDimensions(): [number, number];
  isDevModeEnabled(): boolean;
}

export default class DefaultTapVideoGame implements TapVideoGame {
  private gameStatus: TapVideoGameStatus = TapVideoGameStatus.Stopped;

  private moveToStatusAt: number = 0;
  private gameStartTime: number = 0;
  private currentGameTime: number = 0;
  private generationBanExpires: number = -Infinity;
  private score: number = 0;
  private currentVideoTime: number = 0;
  private currentGamePose: GamePose | undefined = undefined;
  private bannedGridCells = new Set<number>();

  private collectables: Map<string, Collectable> = new Map<string, Collectable>();
  private temporaryVisualFeedbacks: TemporaryVisualFeedback<GameVisualFeedbackAttributes>[] = [];

  private gameWindowWidth = 0;
  private gameWindowHeight = 0;

  private collectableRadius = 0;
  private gridCellSize = 0;

  private maxCollectablesOnField = 3;
  private bombScoreReduction = 10;
  private bombSpawnChance = 0.1;

  private isPersonInCameraBounds: boolean = false;

  private eventEmitter = new EventEmitter<GameEventHandlers>();

  constructor(private gameDuration: number) {}

  public start(): void {
    this.gameStartTime = performance.now();
  }

  public startNewGameCycle(): number {
    this.currentGameTime = performance.now();

    return this.currentGameTime;
  }

  public subscribe<Type extends GameEventType>(event: Type, callback: GameEventHandlers[Type]): () => void {
    this.eventEmitter.on(event, callback);

    return () => this.eventEmitter.off(event, callback);
  }

  public setStatus(status: TapVideoGameStatus): void {
    this.gameStatus = status;
    this.moveToStatusAt = this.getCurrentGameTime();

    this.eventEmitter.emit('status-change', status);
  }

  public collect(collectable: Collectable) {
    if (this.getStatus() !== TapVideoGameStatus.Playing) {
      return;
    }

    if (collectable instanceof Coin) {
      this.score = this.score + 1;
    }

    if (collectable instanceof Bomb) {
      this.score = Math.max(this.score - this.bombScoreReduction, 0);
    }

    this.collectables.delete(collectable.getId());

    this.generationBanExpires = this.getCurrentGameTime() + 500;
  }

  public checkMissedCollectables() {
    for (const collectable of this.collectables.values()) {
      if (collectable.getGenerationTime() + collectable.getCollectionThreshold() < this.currentGameTime) {
        this.collectables.delete(collectable.getId());
      }
    }
  }

  public checkTemporaryVisualFeedbacks() {
    this.temporaryVisualFeedbacks = this.temporaryVisualFeedbacks.reduce((feedbacks, feedback) => {
      if (feedback.getDuration() > 0) {
        feedbacks.push(feedback);
      }

      return feedbacks;
    }, [] as TemporaryVisualFeedback<GameVisualFeedbackAttributes>[]);
  }

  public tryToGenerateCollectables() {
    if (
      this.collectables.size >= this.maxCollectablesOnField ||
      this.getCurrentGameTime() < this.generationBanExpires
    ) {
      return;
    }

    const gridCellSize = this.getGridCellSize();
    const gridCellsInRow = Math.round(this.gameWindowWidth / gridCellSize);
    const gridCellsInColumn = Math.round(this.gameWindowHeight / gridCellSize);

    const initialCells: number[] = [];

    for (let index = 0; index < gridCellsInRow * gridCellsInColumn; index++) {
      if (!this.bannedGridCells.has(index)) {
        initialCells.push(index);
      }
    }

    const cells = initialCells;

    new Array(this.maxCollectablesOnField - this.collectables.size).fill(null).forEach(() => {
      const index = Math.floor(Math.random() * cells.length);
      const cellIndex = cells[index];

      const shouldSpawnBomb = Math.random() < this.bombSpawnChance;

      cells.splice(index, 1);

      const [row, col] = [Math.floor(cellIndex / gridCellsInRow), cellIndex % gridCellsInRow];

      const collectableX = col * gridCellSize + gridCellSize / 2; // Центр ячейки по X
      const collectableY = row * gridCellSize + gridCellSize / 2; // Центр ячейки по Y

      const collectable = shouldSpawnBomb
        ? new Bomb(collectableX, collectableY, this.collectableRadius, this.currentGameTime, 2000)
        : new Coin(collectableX, collectableY, this.collectableRadius, this.currentGameTime, 2000);

      this.collectables.set(collectable.getId(), collectable);
    });
  }

  public setDimensions(width: number, height: number): void {
    this.gameWindowWidth = width;
    this.gameWindowHeight = height;

    this.gridCellSize = Math.min(width, height) * 0.12;
    this.collectableRadius = this.gridCellSize / 1.2;
  }

  public setScore(score: number): void {
    this.score = score;
  }

  public setIsPersonInCameraBounds(value: boolean): void {
    this.isPersonInCameraBounds = value;
  }

  public setBannedGridCells(cells: Set<number>) {
    this.bannedGridCells = cells;
  }

  public setCurrentGamePose(pose: GamePose) {
    this.currentGamePose = pose;
  }

  public setCurrentVideoTime(time: number): void {
    this.currentVideoTime = time;
  }

  public getCollectables(): Map<string, Collectable> {
    return this.collectables;
  }

  public getCurrentGameTime(): number {
    return this.currentGameTime;
  }

  public getCurrentGamePose(): GamePose | undefined {
    return this.currentGamePose;
  }

  public getStatus(): TapVideoGameStatus {
    return this.gameStatus;
  }

  public getScore(): number {
    return this.score;
  }

  public getGameStartTime(): number {
    return this.gameStartTime;
  }

  public getCurrentVideoTime(): number {
    return this.currentVideoTime;
  }

  public getCurrentStatusTime(): number {
    return this.currentGameTime - this.moveToStatusAt;
  }

  public getDimensions(): [number, number] {
    return [this.gameWindowWidth, this.gameWindowHeight];
  }

  public getGridCellSize() {
    return this.gridCellSize;
  }

  public getGameDuration(): number {
    return this.gameDuration;
  }

  public getBannedGridCells(): Set<number> {
    return this.bannedGridCells;
  }

  public getIsPersonInCameraBounds(): boolean {
    return this.isPersonInCameraBounds;
  }

  public isDevModeEnabled(): boolean {
    return process.env.VITE_IS_BOOSTING_GAME_DEV_ENABLED === 'true';
  }
}
