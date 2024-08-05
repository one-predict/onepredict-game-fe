import { nanoid } from 'nanoid';

export interface TemporaryVisualFeedback<FeedbackAttributes extends { type: string }> {
  getId(): string;
  getAttributes(): FeedbackAttributes;
  getCoordinates(): [number, number];
  getDuration(): number;
}

export default class TokenCollectingTemporaryVisualFeedback<FeedbackAttribute extends { type: string }>
  implements TemporaryVisualFeedback<FeedbackAttribute>
{
  private feedbackId = nanoid();

  constructor(
    private x: number,
    private y: number,
    private duration: number,
    private attributes: FeedbackAttribute,
  ) {}

  public getId(): string {
    return this.feedbackId;
  }

  public getAttributes(): FeedbackAttribute {
    return this.attributes;
  }

  public getCoordinates(): [number, number] {
    return [this.x, this.y];
  }

  public getDuration(): number {
    return this.duration;
  }
}
