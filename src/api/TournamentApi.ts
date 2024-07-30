
import { ApiClient } from './ApiClient';

export interface Tournament {
  id: string;
  title: string;
  description: string;
  displayId: string;
  entryPrice: number;
  staticPrizePool: number;
  participantsCount: number;
  startDay: number;
  endDay: number;
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
  getLatestTournaments(): Promise<Tournament[]>;
  getTournamentByDisplayId(displayId: string): Promise<Tournament>;
  getTournamentLeaderboard(displayId: string): Promise<TournamentLeaderboard>;
  getTournamentParticipation(tournamentId: string): Promise<TournamentParticipation | null | undefined>;
  getTournamentParticipationRank(tournamentId: string): Promise<number>;
  joinTournament(tournamentId: string): Promise<void>;
}

export class HttpTournamentApi implements TournamentApi {
  public constructor(private client: ApiClient) {}

  public getLatestTournaments() {
    return this.client.makeCall<Tournament[]>('/tournaments/latest', 'GET');
  }

  public getTournamentByDisplayId(displayId: string) {
    return this.client.makeCall<Tournament>(
      `/tournaments/${displayId}?identifierType=displayId`,
      'GET',
    );
  }

  public getTournamentLeaderboard(tournamentId: string) {
    return this.client.makeCall<TournamentLeaderboard>(
      `/tournaments/${tournamentId}/leaderboard`,
      'GET',
    );
  }

  public async getTournamentParticipation(tournamentId: string) {
    const {
      participation,
    } = await this.client.makeCall<{ participation: TournamentParticipation | null; }>(
      `/tournaments/${tournamentId}/participation`,
      'GET',
    );

    return participation;
  }

  public async getTournamentParticipationRank(tournamentId: string) {
    const { rank } = await this.client.makeCall<{ rank: number; }>(
      `/tournaments/${tournamentId}/participation/rank`,
      'GET',
    );

    return rank;
  }

  public async joinTournament(tournamentId: string) {
    await this.client.makeCall<{ success: boolean; }>(
      `/tournaments/${tournamentId}/participation`,
      'POST',
      {},
    );
  }
}
