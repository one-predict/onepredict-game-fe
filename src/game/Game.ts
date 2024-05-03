import { sampleSize } from 'lodash';
import { NormalizedLandmark } from '@mediapipe/tasks-vision';
import { Collectable } from './Collectable';
import CollectableToken from './CollectableToken';
import TokenType from '../enums/TokenType';
import { TemporaryVisualFeedback } from './TemporaryVisualFeedback';
import { GameVisualFeedbackAttributes } from './feedback-attributes/GameVisualFeedbackAttributes';

export interface Game {
  start(): void;
  stop(): void;
  startNewGameCycle(): number;
  collect(collectable: Collectable): void;
  tryToGenerateCollectables(): void;
  setScore(score: number): void;
  setDimensions(width: number, height: number): void;
  setLastPose(pose: NormalizedLandmark[][]): void;
  setLastVideoTime(time: number): void;
  isStarted(): boolean;
  getGameStartTime(): number;
  getCurrentGameTime(): number;
  getGameDuration(): number;
  getLastPose(): NormalizedLandmark[][];
  getScore(): number;
  getCollectables(): Collectable[];
  checkTemporaryVisualFeedbacks(): void;
  checkMissedCollectables(): void;
  getLastVideoTime(): number;
  getCollectedItems(): Collectable[];
  getDimensions(): [number, number];
}

export default class TokenCollectingGame implements Game {
  private gameStartTime: number = 0;
  private currentGameTime: number = 0;
  private generationBanExpires: number = -Infinity;
  private score: number = 0;
  private lastVideoTime: number = 0;
  private lastPose: NormalizedLandmark[][] = [];
  private started = false;

  private collectables: Collectable[] = [];
  private collectedItems: Collectable[] = [];
  private temporaryVisualFeedbacks: TemporaryVisualFeedback<GameVisualFeedbackAttributes>[] = [];

  private gameWindowWidth = 0;
  private gameWindowHeight = 0;

  constructor(private gameDuration: number) {}

  public start() {
    this.started = true;
    this.gameStartTime = performance.now();
  }

  public stop() {
    this.started = false;
  }

  public startNewGameCycle() {
    this.currentGameTime = performance.now();

    return this.currentGameTime;
  }

  public collect(collectable: Collectable) {
    if (!this.started) {
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
    }, [] as Collectable[]);
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
    if (this.collectables.length || this.getCurrentGameTime() < this.generationBanExpires) {
      return;
    }

    sampleSize(Object.values(TokenType), 3).forEach((tokenType: TokenType) => {
      this.generateCircle(this.gameWindowWidth, this.gameWindowHeight, tokenType, 60);
    });
  }

  public setDimensions(width: number, height: number): void {
    this.gameWindowWidth = width;
    this.gameWindowHeight = height;
  }

  public setScore(score: number): void {
    this.score = score;
  }

  public setLastPose(pose: NormalizedLandmark[][]) {
    this.lastPose = pose;
  }

  public setLastVideoTime(time: number): void {
    this.lastVideoTime = time;
  }

  public isStarted(): boolean {
    return this.started;
  }

  public getCollectables(): Collectable[] {
    return this.collectables;
  }

  public getCurrentGameTime(): number {
    return this.currentGameTime;
  }

  public getLastPose(): NormalizedLandmark[][] {
    return this.lastPose;
  }

  public getScore(): number {
    return this.score;
  }

  public getGameStartTime(): number {
    return this.gameStartTime;
  }

  public getLastVideoTime(): number {
    return this.lastVideoTime;
  }

  public getDimensions(): [number, number] {
    return [this.gameWindowWidth, this.gameWindowHeight];
  }

  public getCollectedItems(): Collectable[] {
    return this.collectedItems;
  }

  public getGameDuration(): number {
    return this.gameDuration;
  }

  private generateCircle(
    gameWindowWidth: number,
    gameWindowHeight: number,
    tokenType: TokenType,
    radius: number,
  ) {
    const offset = radius; // Отступ от края канваса

    // Определяем, будет ли кружок слева или справа (true для слева, false для справа)
    const isLeft = Math.random() < 0.5;

    // Генерируем случайную Y позицию для кружка
    const yPosition = Math.random() * (gameWindowHeight - radius * 2) + radius;

    // Вычисляем X позицию кружка с учетом отступа и стороны
    const xPosition = isLeft ? offset + radius : gameWindowWidth - offset - radius;

    const collectable = new CollectableToken(xPosition, yPosition, tokenType, this.currentGameTime, 2000);

    return this.collectables.push(collectable);
  }
}
