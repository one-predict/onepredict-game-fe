import clsx from 'clsx';
import { Quest } from '@api/QuestApi';
import QuestProgressStatus from '@enums/QuestProgressStatus';
import Typography from '@components/Typography';
import QuestRewards from '@components/QuestRewards';
import Button, { SubmitButton } from '@components/Button';
import TimeRemaining from '@components/TimeRemaining';
import ObjectiveActions from './ObjectiveActions';
import QuestEndDateInfo from '@components/QuestEndDateInfo';
import { getUnixTimestampFromDate } from '@utils/date';
import { isQuestHasEndDate } from '@utils/quests';
import styles from './QuestDetails.module.scss';

export interface QuestDetailsProps {
  quest: Quest;
  onClaimReward: (quest: Quest) => void;
  onStart: (quest: Quest) => void;
  onVerify: (quest: Quest) => void;
  isRewardClaimingInProgress?: boolean;
  isVerificationInProgress?: boolean;
  endDateContainerClassName?: string;
}

const MODERATION_TIME_UPDATE_INTERVAL = 1000;

const QuestDetails = ({
  quest,
  onClaimReward,
  onStart,
  onVerify,
  isRewardClaimingInProgress,
  isVerificationInProgress,
  endDateContainerClassName,
}: QuestDetailsProps) => {
  const progressStatus = quest.progressState?.status ?? QuestProgressStatus.InProgress;

  const hasEndDate = isQuestHasEndDate(quest);

  const renderActions = () => {
    if (progressStatus === QuestProgressStatus.InProgress) {
      return (
        <ObjectiveActions
          objective={quest.objective}
          onQuestStart={() => onStart(quest)}
          onQuestVerify={() => onVerify(quest)}
          isQuestVerificationInProgress={isVerificationInProgress}
        />
      );
    }

    if (progressStatus === QuestProgressStatus.Moderating) {
      const moderationEndDate = quest.progressState?.moderationEndDate ?? new Date();

      return (
        <TimeRemaining
          updateInterval={MODERATION_TIME_UPDATE_INTERVAL}
          unixTimestamp={getUnixTimestampFromDate(moderationEndDate)}
        >
          {({ displayRemainingHours, displayRemainingMinutes, displayRemainingSeconds, absoluteRemainingSeconds }) => {
            const displayTime = `${displayRemainingHours}:${displayRemainingMinutes}:${displayRemainingSeconds}`;

            return (
              <Button
                onClick={() => onVerify(quest)}
                size="large"
                loading={isVerificationInProgress}
                disabled={absoluteRemainingSeconds > 0}
              >
                {absoluteRemainingSeconds ? displayTime : 'Check'}
              </Button>
            );
          }}
        </TimeRemaining>
      );
    }

    if (progressStatus === QuestProgressStatus.WaitingForClaim) {
      return (
        <Button
          size="large"
          className={styles.claimButton}
          onClick={() => onClaimReward(quest)}
          loading={isRewardClaimingInProgress}
          darkLoader
        >
          Claim
        </Button>
      );
    }

    if (progressStatus === QuestProgressStatus.Completed) {
      return (
        <SubmitButton size="large" disabled>
          Completed!
        </SubmitButton>
      );
    }
  };

  return (
    <div className={styles.questDetails}>
      <img className={styles.questImage} src={quest.imageUrl || ''} alt={`${quest.title} Image`} />
      <Typography alignment="center" variant="h2">
        {quest.title}
      </Typography>
      {hasEndDate && progressStatus !== QuestProgressStatus.Completed && (
        <div className={clsx(styles.endDateInfoContainer, endDateContainerClassName)}>
          <QuestEndDateInfo variant="subtitle2" questEndDate={quest.endsAt} />
        </div>
      )}
      <Typography alignment="center" variant="subtitle2" color="gray">
        {quest.description}
      </Typography>
      <QuestRewards rewards={quest.rewards} />
      <div className={styles.questActionsContainer}>{renderActions()}</div>
    </div>
  );
};

export default QuestDetails;
