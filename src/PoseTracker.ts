import createPoseTracker from "./pose-tracking/createPoseTracker.ts";

export interface PoseTracker {
  initialize(): Promise<void>;
  trackPose(video: HTMLVideoElement, timestamp: number): any;
}

export default class MediaPipePoseTracker implements PoseTracker {
  private mediaPipe: any;

  async initialize(): Promise<void> {
    this.mediaPipe = await createPoseTracker();
  }

  public trackPose(video: HTMLVideoElement, timestamp: number): any {
    return this.mediaPipe.detectForVideo(video, timestamp);
  }
}
