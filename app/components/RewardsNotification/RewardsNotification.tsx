import { AnyRewardsNotification } from '@api/RewardsNotificationApi';
import RewardNotificationType from '@enums/RewardNotificationType';
import { PageLayout } from '@components/Layouts';
import CoinsReward from '@components/TokensReward';
import styles from './RewardsNotification.module.scss';

export interface RewardsNotificationProps {
  notification: AnyRewardsNotification;
  onAcknowledge: () => void;
}

const RewardsNotification = ({ notification, onAcknowledge }: RewardsNotificationProps) => {
  const renderNotificationContentByType = () => {
    if (notification.type === RewardNotificationType.Coins) {
      return <CoinsReward onClaimButtonClick={onAcknowledge} count={notification.payload.coins} />;
    }
  };

  return (
    <PageLayout>
      <div className={styles.notificationContainer}>{renderNotificationContentByType()}</div>
    </PageLayout>
  );
};

export default RewardsNotification;
