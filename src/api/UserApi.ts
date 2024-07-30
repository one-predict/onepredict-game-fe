import { ApiClient } from './ApiClient';

export interface User {
  id: string;
  fid: number;
  username: string;
  coinsBalance: number;
  imageUrl: string;
}

export interface UserApi {
  getCurrentUser(): Promise<User | null>;
  getCurrentUserRank(): Promise<number | null>;
}

export class HttpUserApi implements UserApi {
  public constructor(private client: ApiClient) {}

  public async getCurrentUser() {
    const data = await this.client.makeCall<{ user: User | null }>(
      '/users/current-user',
      'GET',
    );

    return data.user;
  }

  public async getCurrentUserRank() {
    const data = await this.client.makeCall<{ rank: number | null }>(
      '/users/current-user/rank',
      'GET',
    );

    return data.rank;
  }
}
