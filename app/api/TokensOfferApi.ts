import { ApiClient } from './ApiClient';

export interface TokensOffer {
  id: string;
  durationInSeconds: number;
  opensAfterTimestamp: number;
  tokens: string[];
  timestamp: number;
  tournamentId: string | null;
}

export interface TokensOffersSeries {
  next: TokensOffer | null;
  current: TokensOffer | null;
  previous: TokensOffer[];
}

export interface TokensOfferApi {
  getOffersSeries(tournamentId: string | null): Promise<TokensOffersSeries>;
}

export class HttpTokensOfferApi implements TokensOfferApi {
  public constructor(private client: ApiClient) {}

  public getOffersSeries(tournamentId: string | null) {
    const urlSearchParams = new URLSearchParams();

    if (tournamentId) {
      urlSearchParams.set('tournamentId', tournamentId);
    }

    return this.client.makeCall<TokensOffersSeries>(`/tokens-offers/series?${urlSearchParams}`, 'GET');
  }
}
