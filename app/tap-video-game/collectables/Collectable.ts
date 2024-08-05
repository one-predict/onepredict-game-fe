import { nanoid } from 'nanoid';

export interface Collectable {
  getId(): string;
  getImage(): string;
  getCoordinates(): [number, number];
  getGenerationTime(): number;
  getCollectionThreshold(): number;
  getRadius(): number;
}

export default abstract class BaseCollectable {
  private collectableId = nanoid();

  constructor(
    private x: number,
    private y: number,
    private radius: number,
    private generationTime: number,
    private collectionThreshold: number,
  ) {}

  public getId(): string {
    return this.collectableId;
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

  public getRadius(): number {
    return this.radius;
  }
}
