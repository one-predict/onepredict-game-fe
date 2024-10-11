import clsx from 'clsx';
import { Portfolio } from '@api/PortfolioApi';
import DigitalAssetPricePredictionView from '@components/DigitalAssetPricePredictionView';
import styles from './PortfolioCard.module.scss';

export interface PortfolioCardProps {
  className?: string;
  portfolio: Portfolio;
  showPriceChange?: boolean;
}

const PortfolioCard = ({ showPriceChange, portfolio, className }: PortfolioCardProps) => {
  return (
    <div className={clsx(styles.portfolioCard, className)}>
      {portfolio.predictions.map((prediction) => {
        const { result } = portfolio;

        const predictionSummaries = result?.predictionSummaries ?? {};
        const priceChange = predictionSummaries[prediction.assetId]?.priceChange ?? null;

        return (
          <DigitalAssetPricePredictionView
            key={prediction.assetId}
            prediction={prediction}
            priceChange={showPriceChange ? priceChange : undefined}
          />
        );
      })}
    </div>
  );
};

export default PortfolioCard;
