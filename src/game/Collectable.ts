import { nanoid } from "nanoid";

export interface Collectable<Type extends string = string> {
  getId(): string;
  getType(): Type;
  getImage(): string;
  getCoordinates(): [number, number];
  getGenerationTime(): number;
  getCollectionThreshold(): number;
  getRadius(gameWidth: number, gameHeight: number): number;
}

export default abstract class BaseCollectable<Type extends string> {
  private collectableId = nanoid();

  protected radiusAmplifier = 0.15;

  constructor(
    private x: number,
    private y: number,
    private type: Type,
    private generationTime: number,
    private collectionThreshold: number,
  ) {}

  public getId(): string {
    return this.collectableId;
  }

  public getType(): Type {
    return this.type;
  }

  public getCollectionThreshold() {
    return this.collectionThreshold;
  }

  public getGenerationTime(): number {
    return this.generationTime;
  }

  public getCoordinates(): [number, number] {
    return [this.x, this.y];
  }

  public getRadius(gameWidth: number, gameHeight: number): number {
    return Math.min(gameWidth, gameHeight) * this.radiusAmplifier;
  }
}
