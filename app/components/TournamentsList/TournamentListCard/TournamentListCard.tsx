import { MouseEvent } from 'react';
import { Tournament } from '@api/TournamentApi';
import useTournamentStatus from '@hooks/useTournamentStatus';
import Button from '@components/Button';
import Typography from '@components/Typography';
import TournamentAvailabilityInfo from '@components/TournamentAvailabilityInfo';
import LabeledContent from '@components/LabeledContent';
import CoinsDisplay from '@components/CoinsDisplay';
import ShareIcon from '@assets/icons/share.svg?react';
import styles from './TournamentListCard.module.scss';

export interface TournamentListCardProps {
  tournament: Tournament;
  onViewDetailsClick: (tournament: Tournament) => void;
  onShareClick?: (tournament: Tournament) => void;
}

const TournamentListCard = ({ tournament, onViewDetailsClick, onShareClick }: TournamentListCardProps) => {
  const prizePool = tournament.entryPrice * tournament.participantsCount + tournament.staticPrizePool;

  const tournamentStatus = useTournamentStatus(tournament);

  const handleShareButtonClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    onShareClick?.(tournament);
  };

  return (
    <div onClick={() => onViewDetailsClick(tournament)} className={styles.tournamentListCard}>
      <TournamentAvailabilityInfo className={styles.tournamentAvailabilityInfo} tournament={tournament} />
      <div className={styles.titleWithParticipantsContainer}>
        <Typography variant="h1" color="gradient1">
          {tournament.title}
        </Typography>
        <LabeledContent row title="Participants:">
          <Typography variant="body2">{tournament.participantsCount}</Typography>
        </LabeledContent>
      </div>
      <img src={tournament.imageUrl} className={styles.tournamentImage} alt={`${tournament.id}-image`} />
      <div className={styles.tournamentImageShadow} />
      <div className={styles.tournamentPrizeInfo}>
        <LabeledContent title="Prize Pool">
          <CoinsDisplay
            variant="body2"
            coins={prizePool}
            tokenImageSrc={tournament.isTonConnected ? '/images/ton-token.png' : '/images/token.png'}
          />
        </LabeledContent>
        <LabeledContent title="Entry Fee">
          <CoinsDisplay
            variant="body2"
            coins={tournament.entryPrice}
            tokenImageSrc={tournament.isTonConnected ? '/images/ton-token.png' : '/images/token.png'}
          />
        </LabeledContent>
      </div>
      <div className={styles.actionsContainer}>
        <Button className={styles.actionButton} onClick={() => onViewDetailsClick(tournament)}>
          {tournamentStatus === 'finished' ? 'View Details' : 'Play'}
        </Button>
        <div onClick={handleShareButtonClick} className={styles.shareButton}>
          <ShareIcon />
          <Typography variant="subtitle2">Share</Typography>
        </div>
      </div>
    </div>
  );
};

export default TournamentListCard;
