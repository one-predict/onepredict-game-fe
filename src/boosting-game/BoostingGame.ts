import { sampleSize } from 'lodash';
import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import EventEmitter from 'eventemitter3';
import BoostingGameStatus from '@app/enums/BoostingGameStatus';
import TokenType from '@app/enums/TokenType';
import { Collectable } from './Collectable';
import CollectableToken from './CollectableToken';
import { TemporaryVisualFeedback } from './TemporaryVisualFeedback';
import { GameVisualFeedbackAttributes } from './feedback-attributes/GameVisualFeedbackAttributes';

export interface GamePose {
  hands: NormalizedLandmark[];
  body: NormalizedLandmark[];
}

export type GameEventType = 'status-change';

export type GameEventHandlers = {
  'status-change': (status: BoostingGameStatus) => void;
};

export interface BoostingGame {
  subscribe<Type extends GameEventType>(event: Type, callback: GameEventHandlers[Type]): () => void;
  start(): void;
  startNewGameCycle(): number;
  collect(collectable: Collectable): void;
  tryToGenerateCollectables(aspectRation: number): void;
  setScore(score: number): void;
  setStatus(status: BoostingGameStatus): void;
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
  getStatus(): BoostingGameStatus;
  getCurrentGamePose(): GamePose | undefined;
  getScore(): number;
  getGridCellSize(): number;
  getCollectables(): Collectable[];
  getIsPersonInCameraBounds(): boolean;
  checkTemporaryVisualFeedbacks(): void;
  checkMissedCollectables(): void;
  getCurrentVideoTime(): number;
  getCollectedItems(): Collectable[];
  getDimensions(): [number, number];
  isDevModeEnabled(): boolean;
}

export default class DefaultBoostingGame implements BoostingGame {
  private gameStatus: BoostingGameStatus = BoostingGameStatus.Stopped;

  private moveToStatusAt: number = 0;
  private gameStartTime: number = 0;
  private currentGameTime: number = 0;
  private generationBanExpires: number = -Infinity;
  private score: number = 0;
  private currentVideoTime: number = 0;
  private currentGamePose: GamePose | undefined = undefined;
  private bannedGridCells = new Set<number>();

  private collectables: Collectable[] = [];
  private collectedItems: Collectable[] = [];
  private temporaryVisualFeedbacks: TemporaryVisualFeedback<GameVisualFeedbackAttributes>[] =
    [];

  private gameWindowWidth = 0;
  private gameWindowHeight = 0;

  private collectableRadius = 0;
  private gridCellSize = 0;

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

  public subscribe<Type extends GameEventType>(
    event: Type,
    callback: GameEventHandlers[Type],
  ): () => void {
    this.eventEmitter.on(event, callback);

    return () => this.eventEmitter.off(event, callback);
  }

  public setStatus(status: BoostingGameStatus): void {
    this.gameStatus = status;
    this.moveToStatusAt = this.getCurrentGameTime();

    this.eventEmitter.emit('status-change', status);
  }

  public collect(collectable: Collectable) {
    if (this.getStatus() !== BoostingGameStatus.Playing) {
      return;
    }

    this.collectedItems.push(collectable);
    this.collectables = [];
    this.score = this.score + 1;
    this.generationBanExpires = this.getCurrentGameTime() + 1000;

    /*const visualFeedbackAttributes: SuccessCollectionVisualFeedbackAttributes = {
      type: TemporaryVisualFeedbackType.SuccessCollection,
      score: 1,
    };

    const temporaryVisualFeedback = new TokenCollectingTemporaryVisualFeedback(
      x,
      y,
      1000,
      visualFeedbackAttributes,
    );

    this.temporaryVisualFeedbacks.push(temporaryVisualFeedback);*/
  }

  public checkMissedCollectables() {
    this.collectables = this.collectables.reduce((collectables, collectable) => {
      if (collectable.getGenerationTime() + collectable.getCollectionThreshold() > this.currentGameTime) {
        collectables.push(collectable);
      }

      return collectables;
    }, [] as Collectable[],);
  }

  public checkTemporaryVisualFeedbacks() {
    this.temporaryVisualFeedbacks = this.temporaryVisualFeedbacks.reduce(
      (feedbacks, feedback) => {
        if (feedback.getDuration() > 0) {
          feedbacks.push(feedback);
        }

        return feedbacks;
      },
      [] as TemporaryVisualFeedback<GameVisualFeedbackAttributes>[],
    );
  }

  public tryToGenerateCollectables() {
    if (this.collectables.length || this.getCurrentGameTime() < this.generationBanExpires) {
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

    console.log(this.bannedGridCells);

    const {
      collectables,
    } = sampleSize(Object.values(TokenType), 3).reduce((aggregation, tokenType) => {
      const index = Math.floor(Math.random() * aggregation.cells.length);
      const cellIndex = aggregation.cells[index];

      aggregation.cells.splice(index, 1);

      const [row, col] = [Math.floor(cellIndex / gridCellsInRow), cellIndex % gridCellsInRow];

      const collectableX = col * gridCellSize + gridCellSize / 2; // Центр ячейки по X
      const collectableY = row * gridCellSize + gridCellSize / 2; // Центр ячейки по Y

      const collectable = new CollectableToken(
        collectableX,
        collectableY,
        this.collectableRadius,
        tokenType as TokenType,
        this.currentGameTime,
        2000,
      );

      aggregation.collectables.push(collectable);

      return aggregation;
    }, {
      collectables: [] as Collectable[],
      cells: initialCells,
    });

    this.collectables = collectables;
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

  public getCollectables(): Collectable[] {
    return this.collectables;
  }

  public getCurrentGameTime(): number {
    return this.currentGameTime;
  }

  public getCurrentGamePose(): GamePose | undefined {
    return this.currentGamePose;
  }

  public getStatus(): BoostingGameStatus {
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

  public getCollectedItems(): Collectable[] {
    return this.collectedItems;
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
    return import.meta.env.VITE_IS_BOOSTING_GAME_DEV_ENABLED === 'true';
  }
}
