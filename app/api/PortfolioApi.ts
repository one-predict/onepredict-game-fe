import { ApiClient } from './ApiClient';
import { TokenDirection } from '@api/TokensOfferApi';

export interface Portfolio {
  id: string;
  userId: string;
  offerId: string;
  interval: [number, number];
  createdAt: Date;
  selectedTokens: PortfolioSelectedToken[];
  appliedCardsStack: Record<string, number>;
  tournamentId: string | null;
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
