import { ApiClient } from './ApiClient';
import TokenType from '@enums/TokenType';
import CoinsHistoricalRecordsPeriod from '@enums/CoinsHistoricalRecordsPeriod';

export interface CoinsHistoricalRecord {
  id: number;
  prices: Record<TokenType, number>;
  timestamp: number;
  completed: boolean;
}

export interface CoinsHistoryApi {
  getLatestCompletedCoinsHistory(period: CoinsHistoricalRecordsPeriod): Promise<CoinsHistoricalRecord[]>;
}

export class HttpCoinsHistoryApi implements CoinsHistoryApi {
  public constructor(private client: ApiClient) {}

  public async getLatestCompletedCoinsHistory(period: CoinsHistoricalRecordsPeriod) {
    return this.client.makeCall<CoinsHistoricalRecord[]>(`/coins-history/completed/latest?period=${period}`, 'GET');
  }
}
