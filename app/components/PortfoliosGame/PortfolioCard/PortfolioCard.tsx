import clsx from 'clsx';
import { Portfolio } from '@api/PortfolioApi';
import DigitalAssetPricePredictionView from '@components/DigitalAssetPricePredictionView';
import styles from './PortfolioCard.module.scss';

export interface PortfolioCardProps {
  className?: string;
  portfolio: Portfolio;
}

const PortfolioCard = ({ portfolio, className }: PortfolioCardProps) => {
  return (
    <div className={clsx(styles.portfolioCard, className)}>
      {portfolio.predictions.map((prediction) => {
        const { result } = portfolio;

        const predictionSummaries = result?.predictionSummaries ?? {};
        const priceChange = predictionSummaries[prediction.assetId]?.priceChange ?? undefined;

        return (
          <DigitalAssetPricePredictionView key={prediction.assetId} prediction={prediction} priceChange={priceChange} />
        );
      })}
    </div>
  );
};

export default PortfolioCard;
