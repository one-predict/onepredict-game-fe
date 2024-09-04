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

export type Referal = User & {
  referalsCount: number;
}
export interface UserApi {
  getCurrentUser(): Promise<User | null>;
  getCurrentUserReferals(): Promise<Referal[]>
  finishOnboarding(): Promise<void>;
}

export class HttpUserApi implements UserApi {
  public constructor(private client: ApiClient) { }

  public async getCurrentUser() {
    const data = await this.client.makeCall<{ user: User | null }>('/users/current-user', 'GET');

    return data.user;
  }

  public async getCurrentUserReferals() {
    const data = await this.client.makeCall<{ referals: Referal[] }>('/users/current-user/referals', 'GET');

    return data.referals;
  }

  public async finishOnboarding() {
    await this.client.makeCall('/users/current-user/onboard', 'POST', {});
  }
}
