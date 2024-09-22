import { ApiClient } from './ApiClient';
import RewardNotificationType from '@enums/RewardNotificationType';

export type RewardsNotifications<Type extends string, Payload extends Record<string, never>> = {
  id: string;
  recipientId: string;
  type: Type;
  payload: Payload;
};

export type CoinsRewardsNotification = RewardsNotifications<RewardNotificationType.Coins, { coins: number }>;

export type AnyRewardsNotification = CoinsRewardsNotification;

export interface RewardsNotificationApi {
  getMyRewardsNotifications(): Promise<AnyRewardsNotification[]>;
  acknowledgeRewardsNotification(id: string): Promise<void>;
}

export class HttpRewardsNotificationApi implements RewardsNotificationApi {
  public constructor(private client: ApiClient) {}

  public getMyRewardsNotifications() {
    return this.client.makeCall<AnyRewardsNotification[]>('/rewards-notifications/my', 'GET');
  }

  public acknowledgeRewardsNotification(id: string) {
    return this.client.makeCall(`/rewards-notifications/${id}`, 'DELETE', {});
  }
}
