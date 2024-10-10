import DigitalAssetPriceDirection from '@enums/DigitalAssetPriceDirection';

interface DigitalAssetPricePrediction {
  assetId: string;
  priceDirection: DigitalAssetPriceDirection;
}

export default DigitalAssetPricePrediction;
