import { ApiClient } from './ApiClient';

export interface User {
  id: string;
  externalId: number | string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  coinsBalance: number;
  imageUrl: string;
  onboarded: boolean;
  referer?: string;
}

export interface UserApi {
  getCurrentUser(): Promise<User | null>;
  finishOnboarding(): Promise<void>;
}

export class HttpUserApi implements UserApi {
  public constructor(private client: ApiClient) {}

  public async getCurrentUser() {
    const data = await this.client.makeCall<{ user: User | null }>('/users/current-user', 'GET');

    return data.user;
  }

  public async finishOnboarding() {
    await this.client.makeCall('/users/current-user/onboard', 'POST', {});
  }
}
