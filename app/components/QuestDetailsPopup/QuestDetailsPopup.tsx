import clsx from 'clsx';
import { Quest } from '@api/QuestApi';
import Popup, { PopupProps } from '@components/Popup';
import QuestDetails from '@components/QuestDetails';
import styles from './QuestDetailsPopup.module.scss';

export interface QuestDetailsPopupProps extends Omit<PopupProps, 'children' | 'height'> {
  quest: Quest | null;
  onClaimReward: (quest: Quest) => void;
  onStart: (quest: Quest) => void;
  onVerify: (quest: Quest) => void;
  isRewardClaimingInProgress?: boolean;
  isVerificationInProgress?: boolean;
}

const QUEST_DETAILS_POPUP_HEIGHT = 60;

const QuestDetailsPopup = ({
  quest,
  isOpen,
  contentClassName,
  isRewardClaimingInProgress,
  isVerificationInProgress,
  onClaimReward,
  onStart,
  onVerify,
  ...popupProps
}: QuestDetailsPopupProps) => {
  return (
    <Popup
      contentClassName={clsx(styles.popupContent, contentClassName)}
      height={QUEST_DETAILS_POPUP_HEIGHT}
      isOpen={isOpen && !!quest}
      {...popupProps}
    >
      {quest && (
        <QuestDetails
          quest={quest}
          onStart={onStart}
          onClaimReward={onClaimReward}
          onVerify={onVerify}
          isRewardClaimingInProgress={isRewardClaimingInProgress}
          isVerificationInProgress={isVerificationInProgress}
          endDateContainerClassName={styles.endDetailsContainer}
        />
      )}
    </Popup>
  );
};

export default QuestDetailsPopup;
