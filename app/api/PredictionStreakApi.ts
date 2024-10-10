import { ApiClient } from './ApiClient';

export interface PredictionStreak {
  id: string;
  userId: string;
  assetStreaks: Record<string, number>;
  choicesStreak: number;
  currentSequence: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PredictionStreakApi {
  getMyPredictionStreak(): Promise<PredictionStreak | null>;
}

export class HttpPredictionStreakApi implements PredictionStreakApi {
  public constructor(private client: ApiClient) {}

  public async getMyPredictionStreak() {
    const { streak } = await this.client.makeCall<{ streak: PredictionStreak | null }>(`/prediction-streaks/my`, 'GET');

    return streak;
  }
}
