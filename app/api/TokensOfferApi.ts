import { ApiClient } from './ApiClient';

export type TokenDirection = 'growth' | 'falling';

export interface TokensOffer {
  id: string;
  durationInSeconds: number;
  opensAfterTimestamp: number;
  tokens: string[];
  timestamp: number;
  tournamentId: string | null;
}

export interface TokensOfferApi {
  getLatestTokensOffers(tournamentId: string | null): Promise<TokensOffer[]>;
}

export class HttpTokensOfferApi implements TokensOfferApi {
  public constructor(private client: ApiClient) {}

  public getLatestTokensOffers(tournamentId: string | null) {
    const urlSearchParams = new URLSearchParams();

    if (tournamentId) {
      urlSearchParams.set('tournamentId', tournamentId);
    }

    return this.client.makeCall<TokensOffer[]>(`/tokens-offers/latest?${urlSearchParams}`, 'GET');
  }
}
