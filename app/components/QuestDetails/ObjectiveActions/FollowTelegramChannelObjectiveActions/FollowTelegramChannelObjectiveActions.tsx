import { useUtils } from '@telegram-apps/sdk-react';
import Button from '@components/Button';
import { generateChannelLink } from '@utils/telegram';

export interface FollowTelegramChannelObjectiveActionsProps {
  channelId: string;
  onFollowLinkClick?: () => void;
}

const FollowTelegramChannelObjectiveActions = ({
  channelId,
  onFollowLinkClick,
}: FollowTelegramChannelObjectiveActionsProps) => {
  const telegramUtils = useUtils(true);

  const handleFollowButtonClick = () => {
    telegramUtils.openTelegramLink(generateChannelLink(channelId));

    onFollowLinkClick?.();
  };

  return (
    <Button size="large" onClick={handleFollowButtonClick}>
      Follow
    </Button>
  );
};

export default FollowTelegramChannelObjectiveActions;
