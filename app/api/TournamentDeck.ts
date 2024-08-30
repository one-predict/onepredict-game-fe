import { ApiClient } from './ApiClient';
import { GameCardId } from '@api/GameCardApi';

export interface TournamentDeck {
  id: string;
  tournamentId: string;
  userId: string;
  cardIds: GameCardId[];
}

export interface UpdateTournamentDeckParams {
  cardIds?: GameCardId[];
}

export interface TournamentDeckApi {
  getMyTournamentDeck(tournamentId: string): Promise<TournamentDeck | null>;
  updateTournamentDeck(id: string, params: UpdateTournamentDeckParams): Promise<TournamentDeck>;
}

export class HttpTournamentDeckApi implements TournamentDeckApi {
  public constructor(private client: ApiClient) {}

  public async getMyTournamentDeck(tournamentId: string) {
    const urlSearchParams = new URLSearchParams();

    urlSearchParams.set('tournamentId', tournamentId);

    const [deck] = await this.client.makeCall<TournamentDeck[]>(`/tournament-decks/my?${urlSearchParams}`, 'GET');

    return deck ?? null;
  }

  public updateTournamentDeck(id: string, params: UpdateTournamentDeckParams) {
    return this.client.makeCall<TournamentDeck>(`/tournament-decks/${id}`, 'PUT', params);
  }
}
