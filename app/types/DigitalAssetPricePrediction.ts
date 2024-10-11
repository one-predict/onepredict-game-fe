import DigitalAssetPriceDirection from '@enums/DigitalAssetPriceDirection';
import DigitalAssetId from '@enums/DigitalAssetId';

interface DigitalAssetPricePrediction {
  assetId: DigitalAssetId;
  priceDirection: DigitalAssetPriceDirection;
}

export default DigitalAssetPricePrediction;
