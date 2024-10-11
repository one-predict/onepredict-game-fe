import { PredictionChoice } from '@api/PredictionChoiceApi';
import useDigitalAssetsLatestTickQuery from '@hooks/queries/useDigitalAssetsLatestTickQuery';
import usePredictionChoiceAssetIds from '@hooks/usePredictionChoiceAssetIds';
import Typography from '@components/Typography';
import PredictionGameSection from '@components/PredictionGame/PredictionGameSection';
import DigitalAssetPricePredictionView from '@components/DigitalAssetPricePredictionView';
import styles from './LiveRoundSection.module.scss';

export interface LiveRoundSectionProps {
  liveRoundChoice: PredictionChoice | null;
}

const LiveRoundSection = ({ liveRoundChoice }: LiveRoundSectionProps) => {
  const assetIds = usePredictionChoiceAssetIds(liveRoundChoice);

  const { data: ticks } = useDigitalAssetsLatestTickQuery(assetIds);

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
            <DigitalAssetPricePredictionView
              key={prediction.assetId}
              priceChange={ticks?.[prediction.assetId]?.currentHourPriceChangePercentage}
              prediction={prediction}
            />
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
