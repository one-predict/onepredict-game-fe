import { useUtils as useTelegramUtils } from '@telegram-apps/sdk-react';
import QRCode from 'react-qr-code';
import { Tournament } from '@api/TournamentApi';
import Button from '@components/Button';
import CopyButton from '@components/CopyButton';
import { generateTournamentLink, generateShareTournamentLink } from '@utils/telegram';
import styles from './ShareTournament.module.scss';

export interface ShareTournamentProps {
  tournament: Tournament;
}

const ShareTournament = ({ tournament }: ShareTournamentProps) => {
  const telegramUtils = useTelegramUtils(true);

  const tournamentLink = generateTournamentLink(tournament.id);

  const handleShareLinkClick = () => {
    telegramUtils.openTelegramLink(generateShareTournamentLink(tournament.id, tournament.title));
  };

  return (
    <div className={styles.shareTournamentsContainer}>
      <QRCode className={styles.qrCode} value={tournamentLink} />
      <div className={styles.buttons}>
        <Button onClick={handleShareLinkClick} size="large">
          Share Link
        </Button>
        <CopyButton textToCopy={tournamentLink} />
      </div>
    </div>
  );
};

export default ShareTournament;
