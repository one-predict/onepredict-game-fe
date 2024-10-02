import { useUtils } from '@telegram-apps/sdk-react';
import Button from '@components/Button';

export interface SubscribeSocialsActionsProps {
  socialLink: string;
  onLinkClick?: () => void;
}

const SubscribeSocialsObjectiveActions = ({ socialLink, onLinkClick }: SubscribeSocialsActionsProps) => {
  const telegramUtils = useUtils(true);

  const handleSubscribeButtonClick = () => {
    telegramUtils.openLink(socialLink);

    onLinkClick?.();
  };

  return (
    <Button size="large" onClick={handleSubscribeButtonClick}>
      Subscribe
    </Button>
  );
};

export default SubscribeSocialsObjectiveActions;
