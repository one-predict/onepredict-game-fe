import { ApiClient } from './ApiClient';
import DigitalAssetId from '@enums/DigitalAssetId';

export interface DigitalAssetLatestTick {
  timestamp: number;
  price: number;
  currentHourOpenPrice: number;
  currentHourPriceChange: number;
  currentHourPriceChangePercentage: number;
}

export interface DigitalAssetsTickApi {
  getForAssets(assetIds: DigitalAssetId[]): Promise<Record<string, DigitalAssetLatestTick>>;
}

export class HttpDigitalAssetsTickApi implements DigitalAssetsTickApi {
  public constructor(private client: ApiClient) {}

  public getForAssets(assetIds: DigitalAssetId[]) {
    const urlSearchParams = new URLSearchParams();

    assetIds.forEach((assetId) => {
      urlSearchParams.append('assetIds', assetId.toString());
    });

    return this.client.makeCall<Record<string, DigitalAssetLatestTick>>(
      `/digital-assets-ticks?${urlSearchParams}`,
      'GET',
    );
  }
}
