import ApiClient from './ApiClient';

export interface TokenOffer {
  firstToken: string;
  secondToken: string;
}

export interface PortfolioOffer {
  id: string;
  day: number;
  tokenOffers: TokenOffer[];
}

export interface PortfolioOfferApi {
  getPortfolioOffers(): Promise<PortfolioOffer[]>;
}

export default class HttpPortfolioOfferApi implements PortfolioOfferApi {
  public constructor(private client: ApiClient) {}

  public getPortfolioOffers() {
    return this.client.makeCall<PortfolioOffer[]>(`/portfolio-offers`, 'GET');
  }
}
