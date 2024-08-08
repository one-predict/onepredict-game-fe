import { ApiClient } from './ApiClient';

export type TokenDirection = 'growth' | 'falling';

export interface PortfolioOffer {
  id: string;
  day: number;
  date: string;
  tokens: string[];
}

export interface PortfolioOfferApi {
  getLatestPortfolioOffers(): Promise<PortfolioOffer[]>;
}

export class HttpPortfolioOfferApi implements PortfolioOfferApi {
  public constructor(private client: ApiClient) {}

  public getLatestPortfolioOffers() {
    return this.client.makeCall<PortfolioOffer[]>(`/portfolio-offers/latest`, 'GET');
  }
}
