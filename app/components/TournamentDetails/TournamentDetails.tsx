import { UserInventory } from '@api/UserInventoryApi';
import { TokensOffersSeries } from '@api/TokensOfferApi';
import { Portfolio } from '@api/PortfolioApi';
import { Tournament, TournamentLeaderboard, TournamentParticipation } from '@api/TournamentApi';
import { TournamentDeck } from '@api/TournamentDeck';
import useTournamentStatus from '@hooks/useTournamentStatus';
import Typography from '@components/Typography';
import Button from '@components/Button';
import TournamentLeaderboardComponent from '@components/TournamentLeaderboard';
import Loader from '@components/Loader';
import LabeledContent from '@components/LabeledContent';
import TournamentAvailabilityInfo from '@components/TournamentAvailabilityInfo';
import CoinsDisplay from '@components/CoinsDisplay';
import DeckIcon from '@assets/icons/deck.svg?react';
import PortfolioIcon from '@assets/icons/portfolio.svg?react';
import styles from './TournamentDetails.module.scss';

export interface TournamentDetailsProps {
  tournament: Tournament;
  tournamentParticipation: TournamentParticipation | null;
  tournamentLeaderboard: TournamentLeaderboard | undefined;
  tournamentDeck: TournamentDeck | null | undefined;
  tournamentOffersSeries: TokensOffersSeries | undefined;
  portfolios: Record<string, Portfolio> | undefined;
  myInventory: UserInventory | undefined;
  canJoinTournament?: boolean;
  isTournamentJoiningInProgress?: boolean;
  onConfigureDeckButtonClick: () => void;
  onPortfoliosButtonClick: () => void;
  onJoinTournamentButtonClick: () => void;
}

const TournamentDetails = ({
  tournament,
  tournamentLeaderboard,
  myInventory,
  tournamentDeck,
  tournamentParticipation,
  tournamentOffersSeries,
  portfolios,
  canJoinTournament,
  isTournamentJoiningInProgress,
  onJoinTournamentButtonClick,
  onConfigureDeckButtonClick,
  onPortfoliosButtonClick,
}: TournamentDetailsProps) => {
  const tournamentStatus = useTournamentStatus(tournament);

  const renderTournamentDeckSection = () => {
    if (tournamentStatus !== 'upcoming' || tournamentDeck === null) {
      return null;
    }

    if (tournamentDeck === undefined || myInventory === undefined) {
      return <Loader className={styles.sectionLoader} centered />;
    }

    return (
      <div className={styles.tournamentDeckSection}>
        {myInventory.availableCardSlots > tournamentDeck.cardIds.length && (
          <Typography color="yellow" variant="body2">
            You have {myInventory.availableCardSlots - tournamentDeck.cardIds.length} free slots in your deck!
          </Typography>
        )}
        <div onClick={onConfigureDeckButtonClick} className={styles.actionButton}>
          <DeckIcon />
          <Typography variant="h4" color="primary">
            Configure Deck
          </Typography>
        </div>
      </div>
    );
  };

  const renderPortfoliosSection = () => {
    if (tournamentStatus !== 'live') {
      return null;
    }

    if (!tournamentOffersSeries || !portfolios) {
      return <Loader className={styles.sectionLoader} centered />;
    }

    const upcomingOffer = tournamentOffersSeries.next;

    return (
      <div className={styles.portfoliosSection}>
        {upcomingOffer && !portfolios[upcomingOffer.id] && (
          <Typography color="yellow" variant="body2">
            You have an available portfolio to submit!
          </Typography>
        )}
        <div onClick={onPortfoliosButtonClick} className={styles.actionButton}>
          <PortfolioIcon />
          <Typography variant="h4" color="primary">
            Portfolios
          </Typography>
        </div>
      </div>
    );
  };

  const renderLeaderboardSection = () => {
    if (tournamentStatus === 'upcoming') {
      return null;
    }

    return tournamentLeaderboard ? (
      <TournamentLeaderboardComponent rankedParticipants={tournamentLeaderboard.rankedParticipants} />
    ) : (
      <Loader className={styles.sectionLoader} centered />
    );
  };

  return (
    <div className={styles.tournamentDetails}>
      <TournamentAvailabilityInfo className={styles.tournamentAvailabilityInfo} tournament={tournament} />
      <img className={styles.tournamentImage} src={tournament.imageUrl} alt={tournament.title} />
      <div className={styles.tournamentTitleWithDescription}>
        <Typography variant="h1" color="gradient1">
          {tournament.title}
        </Typography>
        <Typography variant="body2">{tournament.description}</Typography>
      </div>
      {!tournamentParticipation && (
        <div className={styles.participationInfo}>
          <Typography color="gray" variant="subtitle2">
            Your not a participant of tournament:
          </Typography>
          <Button
            className={styles.joinTournamentButton}
            disabled={!canJoinTournament}
            onClick={onJoinTournamentButtonClick}
            loading={isTournamentJoiningInProgress}
          >
            Join for {tournament.entryPrice} AIP
          </Button>
        </div>
      )}
      <div className={styles.tournamentPrizeInfo}>
        <LabeledContent title="Prize Pool">
          <CoinsDisplay
            coins={tournament.participantsCount * tournament.entryPrice + tournament.staticPrizePool}
          ></CoinsDisplay>
        </LabeledContent>
        <LabeledContent title="Participants">
          <Typography alignment="right" variant="body2">
            {tournament.participantsCount}
          </Typography>
        </LabeledContent>
      </div>
      <div className={styles.detailsSections}>
        {renderTournamentDeckSection()}
        {renderPortfoliosSection()}
        {renderLeaderboardSection()}
      </div>
    </div>
  );
};

export default TournamentDetails;
