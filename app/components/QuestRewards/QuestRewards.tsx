import { QuestReward } from '@types/QuestReward';
import QuestRewardType from '@enums/QuestRewardType';
import QuestCoinsReward from './QuestCoinsReward';
import GradientBorderContainer from '@components/GradientBorderContainer';
import styles from './QuestRewards.module.scss';

export interface QuestRewards {
  rewards: QuestReward[];
}

const QuestRewards = ({ rewards }: QuestRewards) => {
  return (
    <div className={styles.rewardsContainer}>
      {rewards.map((reward) => (
        <GradientBorderContainer
          key={reward.type}
          borderWrapperClassName={styles.rewardWrapper}
          innerContainerClassName={styles.rewardInnerContainer}
        >
          {reward.type === QuestRewardType.Coins && <QuestCoinsReward coins={reward.coins} />}
        </GradientBorderContainer>
      ))}
    </div>
  );
};

export default QuestRewards;
