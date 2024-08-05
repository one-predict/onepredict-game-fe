import { FilesetResolver, PoseLandmarker, PoseLandmarkerResult } from '@mediapipe/tasks-vision';

export interface PoseTracker {
  initialize(): Promise<void>;
  trackPose(video: HTMLVideoElement, timestamp: number): Promise<PoseLandmarkerResult>;
}

export default class MediaPipePoseTracker implements PoseTracker {
  private mediaPipe?: PoseLandmarker;

  async initialize(): Promise<void> {
    const vision = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm',
    );

    this.mediaPipe = await PoseLandmarker.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task`,
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
      numPoses: 1,
      minPoseDetectionConfidence: 0.8,
      minPosePresenceConfidence: 0.8,
      minTrackingConfidence: 0.8,
    });
  }

  public trackPose(video: HTMLVideoElement, timestamp: number) {
    const mediaPipe = this.mediaPipe;

    if (!mediaPipe) {
      throw new Error('MediaPipePoseTracker is not initialized');
    }

    return new Promise<PoseLandmarkerResult>((resolve) => {
      mediaPipe.detectForVideo(video, timestamp, (pose) => {
        resolve(pose);
      });
    });
  }
}
