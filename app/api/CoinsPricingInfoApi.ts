import { ApiClient } from './ApiClient';
import TokenType from '@enums/TokenType';

export type CoinPricingDetails = Record<
  TokenType,
  {
    price: number;
    percentChange24h: number;
    percentChange1h: number;
    lastUpdateTimestamp: number;
  }
>;

export interface CoinsPricingInfo {
  pricingDetails: CoinPricingDetails;
  updatedAt: Date;
}

export interface CoinsPricingInfoApi {
  get(): Promise<CoinsPricingInfo>;
}

export class HttpCoinsPricingInfoApi implements CoinsPricingInfoApi {
  public constructor(private client: ApiClient) {}

  public async get() {
    return this.client.makeCall<CoinsPricingInfo>('/coins-pricing-info', 'GET');
  }
}
