import { ApiClient } from './ApiClient';
import { TokenDirection } from '@api/PortfolioOfferApi';

export interface Portfolio {
  id: string;
  userId: string;
  offerId: string;
  createdAt: Date;
  selectedTokens: PortfolioSelectedToken[];
  earnedCoins: number;
  isAwarded: boolean;
}

export interface PortfolioSelectedToken {
  id: string;
  direction: TokenDirection;
}

export interface CreatePortfolioParams {
  offerId: string;
  selectedTokens: PortfolioSelectedToken[];
}

export interface PortfolioApi {
  getUserPortfolios(offerIds: string[]): Promise<Portfolio[]>;
  createPortfolio(params: CreatePortfolioParams): Promise<Portfolio>;
}

export class HttpPortfolioApi implements PortfolioApi {
  public constructor(private client: ApiClient) {}

  public getUserPortfolios(offerIds: string[]) {
    const urlSearchParams = new URLSearchParams();

    offerIds.forEach((offerId) => {
      urlSearchParams.append('offerIds', offerId);
    });

    return this.client.makeCall<Portfolio[]>(`/portfolios?${urlSearchParams}`, 'GET');
  }

  public createPortfolio(params: CreatePortfolioParams) {
    return this.client.makeCall<Portfolio>(`/portfolios`, 'POST', params);
  }
}
