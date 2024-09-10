import { ApiClient } from './ApiClient';

export enum TournamentStatus {
  Upcoming = 'upcoming',
  Live = 'live',
  Finished = 'finished',
}

export interface Tournament {
  id: string;
  title: string;
  description: string;
  entryPrice: number;
  staticPrizePool: number;
  participantsCount: number;
  startTimestamp: number;
  endTimestamp: number;
  roundDurationInSeconds: number;
  imageUrl?: string;
}

export interface TournamentParticipant {
  id: string;
  username: string;
  imageUrl: string;
  points: number;
}

export interface TournamentParticipation {
  id: string;
  userId: string;
  tournamentId: string;
  points: number;
}

export interface TournamentLeaderboard {
  rankedParticipants: Array<{
    id: string;
    username: string;
    imageUrl: string;
    points: number;
  }>;
}

export interface TournamentApi {
  getLatestTournaments(status?: TournamentStatus): Promise<Tournament[]>;
  getTournamentById(tournamentId: string): Promise<Tournament>;
  getTournamentLeaderboard(tournamentId: string): Promise<TournamentLeaderboard>;
  getTournamentParticipation(tournamentId: string): Promise<TournamentParticipation | null | undefined>;
  getTournamentParticipationRank(tournamentId: string): Promise<number>;
  joinTournament(tournamentId: string): Promise<void>;
}

export class HttpTournamentApi implements TournamentApi {
  public constructor(private client: ApiClient) {}

  public getLatestTournaments(status?: TournamentStatus) {
    const urlSearchParams = new URLSearchParams();

    if (status) {
      urlSearchParams.append('status', status);
    }

    return this.client.makeCall<Tournament[]>(`/tournaments/latest?${urlSearchParams}`, 'GET');
  }

  public getTournamentById(tournamentId: string) {
    return this.client.makeCall<Tournament>(`/tournaments/${tournamentId}`, 'GET');
  }

  public getTournamentLeaderboard(tournamentId: string) {
    return this.client.makeCall<TournamentLeaderboard>(`/tournaments/${tournamentId}/leaderboard`, 'GET');
  }

  public async getTournamentParticipation(tournamentId: string) {
    const { participation } = await this.client.makeCall<{ participation: TournamentParticipation | null }>(
      `/tournaments/${tournamentId}/participation`,
      'GET',
    );

    return participation;
  }

  public async getTournamentParticipationRank(tournamentId: string) {
    const { rank } = await this.client.makeCall<{ rank: number }>(
      `/tournaments/${tournamentId}/participation/rank`,
      'GET',
    );

    return rank;
  }

  public async joinTournament(tournamentId: string) {
    await this.client.makeCall<{ success: boolean }>(`/tournaments/${tournamentId}/participation`, 'POST', {});
  }
}
