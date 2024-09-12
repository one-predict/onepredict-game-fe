import { ApiClient } from './ApiClient';

export interface Referral {
  id: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  coinsBalance: number;
  imageUrl: string;
}

export interface ReferralApi {
  getMyReferrals(): Promise<Referral[]>;
}

export class HttpReferralApi implements ReferralApi {
  public constructor(private client: ApiClient) {}

  public getMyReferrals() {
    return this.client.makeCall<Referral[]>('/referrals/my', 'GET');
  }
}
