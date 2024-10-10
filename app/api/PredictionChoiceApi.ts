import { ApiClient } from './ApiClient';
import DigitalAssetPricePrediction from '@types/DigitalAssetPricePrediction';

export interface DigitalAssetPricePredictionSummary {
  correct: boolean;
  points: number;
}

export type PredictionSummaries = Record<string, DigitalAssetPricePredictionSummary>;

export interface PredictionChoiceResult {
  earnedCoins: number;
  predictionSummaries: PredictionSummaries;
}

export interface PredictionChoice {
  id: string;
  userId: string;
  round: number;
  predictions: DigitalAssetPricePrediction[];
  streakSequence: number;
  isAwarded: boolean;
  result?: PredictionChoiceResult;
}

export interface SubmitPredictionChoiceParams {
  round: number;
  predictions: DigitalAssetPricePrediction[];
}

export interface PredictionChoiceApi {
  getMyLatestChoices(limit: number): Promise<PredictionChoice[]>;
  submitChoice(params: SubmitPredictionChoiceParams): Promise<PredictionChoice>;
}

export class HttpUserPredictionChoiceApi implements PredictionChoiceApi {
  public constructor(private client: ApiClient) {}

  public getMyLatestChoices(limit: number) {
    const urlSearchParams = new URLSearchParams();

    urlSearchParams.append('limit', limit.toString());

    return this.client.makeCall<PredictionChoice[]>(`/prediction-choices/my?${urlSearchParams}`, 'GET');
  }

  public submitChoice(params: SubmitPredictionChoiceParams) {
    return this.client.makeCall<PredictionChoice>(`/prediction-choices/${params.round}`, 'PUT', params);
  }
}
