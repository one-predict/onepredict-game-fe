import { useMemo, memo } from 'react';
import clsx from 'clsx';
import { Quest } from '@api/QuestApi';
import QuestProgressStatus from '@enums/QuestProgressStatus';
import Typography from '@components/Typography';
import QuestEndDateInfo from '@components/QuestEndDateInfo';
import CheckedIcon from '@assets/icons/checked-circle.svg?react';
import ClockIcon from '@assets/icons/clock.svg?react';
import RewardIcon from '@assets/icons/reward.svg?react';
import { isQuestHasEndDate } from '@utils/quests';
import styles from './QuestInfoTag.module.scss';

export interface QuestInfoTagProps {
  className?: string;
  quest: Quest;
}

const QuestInfoTag = memo(({ className, quest }: QuestInfoTagProps) => {
  const progressStatus = quest.progressState?.status ?? QuestProgressStatus.InProgress;

  const isModerationTimePassed = useMemo(() => {
    return !!quest.progressState?.moderationEndDate && new Date() > new Date(quest.progressState.moderationEndDate);
  }, [quest.progressState?.moderationEndDate]);

  const hasEndDate = isQuestHasEndDate(quest);

  const composedClassName = clsx(
    styles.questInfoTag,
    {
      [styles.inProgressWithEndDateQuestInfoTag]: progressStatus === QuestProgressStatus.InProgress && hasEndDate,
      [styles.moderationQuestInfoTag]: progressStatus === QuestProgressStatus.Moderating,
      [styles.waitingForClaimQuestInfoTag]: progressStatus === QuestProgressStatus.WaitingForClaim,
      [styles.completedQuestInfoTag]: progressStatus === QuestProgressStatus.Completed,
    },
    className,
  );

  return (
    <div className={composedClassName}>
      {progressStatus === QuestProgressStatus.InProgress && hasEndDate && (
        <QuestEndDateInfo questEndDate={quest.endsAt} variant="subtitle2" />
      )}
      {progressStatus === QuestProgressStatus.Moderating && (
        <>
          {isModerationTimePassed ? <CheckedIcon className={styles.icon} /> : <ClockIcon className={styles.icon} />}
          <Typography variant="subtitle2">{isModerationTimePassed ? 'Verified!' : 'Verification'}</Typography>
        </>
      )}
      {progressStatus === QuestProgressStatus.WaitingForClaim && (
        <>
          <RewardIcon className={styles.icon} />
          <Typography color="black" variant="subtitle2">
            Waiting for claim
          </Typography>
        </>
      )}
      {progressStatus === QuestProgressStatus.Completed && (
        <>
          <CheckedIcon className={styles.icon} />
          <Typography color="black" variant="subtitle2">
            Completed
          </Typography>
        </>
      )}
    </div>
  );
});

export default QuestInfoTag;
