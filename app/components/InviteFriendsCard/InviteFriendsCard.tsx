import { useUtils as useTelegramUtils } from '@telegram-apps/sdk-react';
import { TOKEN_NAME } from '@constants/token';
import Typography from '@components/Typography';
import Button from '@components/Button';
import CopyButton from '@components/CopyButton';
import { generateReferralLink, generateShareFriendLink } from '@utils/telegram';
import styles from './InviteFriendsCard.module.scss';

export interface InviteFriendsCardProps {
  currentUserId?: string;
}

const InviteFriendsCard = ({ currentUserId }: InviteFriendsCardProps) => {
  const telegramUtils = useTelegramUtils(true);

  const handleInviteButtonClick = () => {
    if (!currentUserId) {
      return;
    }

    telegramUtils.openTelegramLink(generateShareFriendLink(currentUserId));
  };

  return (
    <div className={styles.inviteFriendsCard}>
      <Typography variant="h1" color="gradient1">
        Invite Friends
      </Typography>
      <Typography variant="subtitle2" color="gray">
        Your friend and you will get{' '}
        <Typography variant="subtitle2" tag="span" color="green">
          500 {TOKEN_NAME}
        </Typography>
        .
      </Typography>
      <Typography variant="subtitle2" color="gray">
        Get{' '}
        <Typography variant="subtitle2" tag="span" color="green">
          10%
        </Typography>{' '}
        from your friends coins income.
      </Typography>
      <div className={styles.inviteFriendsButtonsContainer}>
        <Button onClick={handleInviteButtonClick} disabled={!currentUserId}>
          Invite Friend
        </Button>
        <CopyButton textToCopy={currentUserId ? generateReferralLink(currentUserId) : ''} />
      </div>
    </div>
  );
};

export default InviteFriendsCard;
