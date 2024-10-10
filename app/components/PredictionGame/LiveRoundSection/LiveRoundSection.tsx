import { PredictionChoice } from '@api/PredictionChoiceApi';
import Typography from '@components/Typography';
import PredictionGameSection from '@components/PredictionGame/PredictionGameSection';
import DigitalAssetPricePredictionView from '@components/DigitalAssetPricePredictionView';
import styles from './LiveRoundSection.module.scss';

export interface LiveRoundSectionProps {
  liveRoundChoice: PredictionChoice | null;
}

const LiveRoundSection = ({ liveRoundChoice }: LiveRoundSectionProps) => {
  return (
    <PredictionGameSection>
      <div className={styles.sectionHeader}>
        <Typography alignment="left" variant="h4">
          Live Round
        </Typography>
        <div className={styles.liveIcon} />
      </div>
      {liveRoundChoice ? (
        <div className={styles.liveRoundPredictions}>
          {liveRoundChoice?.predictions.map((prediction) => (
            <DigitalAssetPricePredictionView key={prediction.assetId} priceChange={undefined} prediction={prediction} />
          ))}
        </div>
      ) : (
        <Typography color="secondary" variant="subtitle2">
          You don't have choice for this round
        </Typography>
      )}
    </PredictionGameSection>
  );
};

export default LiveRoundSection;
