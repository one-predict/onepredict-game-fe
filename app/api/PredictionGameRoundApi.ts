import DigitalAssetId from '@enums/DigitalAssetId';
import { ApiClient } from './ApiClient';

export interface RoundBoundaries {
  startTimestamp: number;
  endTimestamp: number;
}

export interface PredictionGameRoundsInfo {
  currentRound: number;
  currentRoundTimeBoundaries: RoundBoundaries;
  nextRound: number;
  nextRoundTimeBoundaries: RoundBoundaries;
  nextRoundAssets: DigitalAssetId[];
}

export interface PredictionGameRoundApi {
  getRoundsInfo(): Promise<PredictionGameRoundsInfo>;
}

export class HttpPredictionGameRoundApi implements PredictionGameRoundApi {
  public constructor(private client: ApiClient) {}

  public getRoundsInfo() {
    return this.client.makeCall<PredictionGameRoundsInfo>(`/prediction-game-rounds/info`, 'GET');
  }
}
