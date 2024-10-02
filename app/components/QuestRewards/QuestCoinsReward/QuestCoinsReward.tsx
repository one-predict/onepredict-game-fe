import CoinsDisplay from '@components/CoinsDisplay';
import styles from './QuestCoinsReward.module.scss';

export interface CoinsRewardProps {
  coins: number;
}

const QuestCoinsReward = ({ coins }: CoinsRewardProps) => {
  return (
    <div>
      <CoinsDisplay
        containerClassName={styles.coinsDisplay}
        tokenImageClassName={styles.tokenImage}
        variant="h6"
        coins={coins}
      />
    </div>
  );
};

export default QuestCoinsReward;
