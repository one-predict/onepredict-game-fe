import { ApiClient } from './ApiClient';
import DigitalAssetId from '@enums/DigitalAssetId';
import DigitalAssetsPricesSnapshotsPeriod from '@enums/DigitalAssetsPricesSnapshotsPeriod';

export interface DigitalAssetsPricesSnapshot {
  id: number;
  prices: Record<DigitalAssetId, number>;
  timestamp: number;
}

export interface DigitalAssetsPricesSnapshotApi {
  getLatestSnapshots(period: DigitalAssetsPricesSnapshotsPeriod): Promise<DigitalAssetsPricesSnapshot[]>;
}

export class HttpDigitalAssetsPricesSnapshotApi implements DigitalAssetsPricesSnapshotApi {
  public constructor(private client: ApiClient) {}

  public getLatestSnapshots(period: DigitalAssetsPricesSnapshotsPeriod) {
    return this.client.makeCall<DigitalAssetsPricesSnapshot[]>(
      `/digital-assets-prices-snapshots/latest?period=${period}`,
      'GET',
    );
  }
}
