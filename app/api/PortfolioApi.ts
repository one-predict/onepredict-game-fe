import DigitalAssetPricePrediction from '@types/DigitalAssetPricePrediction';
import { ApiClient } from './ApiClient';

export interface PortfolioDigitalAssetPricePredictionSummary {
  priceChange: number;
  points: number;
}

export interface PortfolioResult {
  predictionSummaries: Record<string, PortfolioDigitalAssetPricePredictionSummary>;
  totalPoints: number;
}

export interface Portfolio {
  id: string;
  userId: string;
  offerId: string;
  interval: [number, number];
  createdAt: Date;
  predictions: DigitalAssetPricePrediction[];
  tournamentId: string;
  result?: PortfolioResult;
  isAwarded: boolean;
}

export interface CreatePortfolioParams {
  offerId: string;
  tournamentId: string;
  predictions: DigitalAssetPricePrediction[];
}

export interface PortfolioApi {
  getMyPortfolios(offerIds: string[]): Promise<Portfolio[]>;
  createPortfolio(params: CreatePortfolioParams): Promise<Portfolio>;
  applyGameCards(id: string, cardsStack: Record<string, number>): Promise<Portfolio>;
}

export class HttpPortfolioApi implements PortfolioApi {
  public constructor(private client: ApiClient) {}

  public getMyPortfolios(offerIds: string[]) {
    const urlSearchParams = new URLSearchParams();

    offerIds.forEach((offerId) => {
      urlSearchParams.append('offerIds', offerId);
    });

    return this.client.makeCall<Portfolio[]>(`/portfolios/my?${urlSearchParams}`, 'GET');
  }

  public createPortfolio(params: CreatePortfolioParams) {
    return this.client.makeCall<Portfolio>(`/portfolios`, 'POST', params);
  }

  public applyGameCards(id: string, cardsStack: Record<string, number>) {
    return this.client.makeCall<Portfolio>(`/portfolios/${id}/cards`, 'PUT', { cardsStack });
  }
}
