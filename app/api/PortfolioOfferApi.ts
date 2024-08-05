import { ApiClient } from './ApiClient';

export interface TokenOffer {
  firstToken: string;
  secondToken: string;
}

export interface PortfolioOffer {
  id: string;
  day: number;
  date: string;
  tokenOffers: TokenOffer[];
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
