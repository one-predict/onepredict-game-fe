import { NormalizedLandmark } from '@mediapipe/tasks-vision';

export interface LandmarksDrawer {
  draw(landmarks: NormalizedLandmark[]): void;
}
