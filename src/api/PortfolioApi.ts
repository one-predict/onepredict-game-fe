import ApiClient from './ApiClient';

export interface Portfolio {
  id: string;
  userId: string;
  offerId: string;
  createdAt: Date;
  earnedPoints?: number;
  isAwarded: boolean;
}

export interface PortfolioApi {
  getUserPortfolios(offerIds: string[]): Promise<Portfolio[]>;
}

export default class HttpPortfolioApi implements PortfolioApi {
  public constructor(private client: ApiClient) {}

  public getUserPortfolios(offerIds: string[]) {
    const urlSearchParams = new URLSearchParams();

    offerIds.forEach((offerId) => {
      urlSearchParams.append('offerIds', offerId);
    });

    return this.client.makeCall<Portfolio[]>(`/portfolios?${urlSearchParams}`, 'GET');
  }
}
