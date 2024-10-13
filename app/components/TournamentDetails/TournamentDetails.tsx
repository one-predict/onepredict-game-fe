import { TonConnectButton, useTonWallet, useTonConnectUI, SendTransactionRequest } from '@tonconnect/ui-react';
import { Portfolio } from '@api/PortfolioApi';
import { Tournament, TournamentLeaderboard, TournamentParticipation } from '@api/TournamentApi';
import { TokensOffersSeries } from '@api/TokensOfferApi';
import DigitalAssetPricePrediction from '@types/DigitalAssetPricePrediction';
import useTournamentStatus from '@hooks/useTournamentStatus';
import { getCurrentUnixTimestamp } from '@utils/date';
import Typography from '@components/Typography';
import Button from '@components/Button';
import TournamentLeaderboardComponent from '@components/TournamentLeaderboard';
import Loader from '@components/Loader';
import LabeledContent from '@components/LabeledContent';
import TournamentAvailabilityInfo from '@components/TournamentAvailabilityInfo';
import CoinsDisplay from '@components/CoinsDisplay';
import PortfoliosGame from '@components/PortfoliosGame';
import ColoredPoints from '@components/ColoredPoints';
import { prepareSendTransaction } from '@app/utils/ton-transactions';
import styles from './TournamentDetails.module.scss';

const VITE_TON_TOURNAMENT_ADDRESS = import.meta.env.VITE_TON_TOURNAMENT_ADDRESS;

export interface TournamentDetailsProps {
  tournament: Tournament;
  tournamentParticipation: TournamentParticipation | null;
  tournamentLeaderboard: TournamentLeaderboard | undefined;
  portfolios: Record<string, Portfolio> | undefined;
  offersSeries: TokensOffersSeries | null;
  canJoinTournament?: boolean;
  onPortfolioSubmit: (offerId: string, predictions: DigitalAssetPricePrediction[]) => void;
  tournamentParticipationRank: number | null | undefined;
  isTournamentJoiningInProgress?: boolean;
  isPortfolioSubmitInProgress?: boolean;
  onJoinTournamentButtonClick: (walletAddress?: string) => void;
}

const TournamentDetails = ({
  tournament,
  tournamentLeaderboard,
  tournamentParticipation,
  tournamentOffersSeries,
  portfolios,
  offersSeries,
  tournamentParticipationRank,
  canJoinTournament,
  onPortfolioSubmit,
  isTournamentJoiningInProgress,
  onJoinTournamentButtonClick,
  isPortfolioSubmitInProgress,
}: TournamentDetailsProps) => {
  const wallet = useTonWallet();
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const tournamentTicker = tournament.isTonConnected ? 'AIP' : 'TON';

  const tournamentStatus = useTournamentStatus(tournament);

  const isRegistrationOpen =
    tournamentStatus === 'live' && tournament.joinCloseTimestamp - getCurrentUnixTimestamp() > 0;

  const renderPortfoliosSection = () => {
    if (tournamentStatus !== 'live' || tournamentParticipation === null) {
      return null;
    }

    if (!tournamentOffersSeries || !portfolios) {
      return <Loader className={styles.sectionLoader} centered />;
    }

    return (
      <div className={styles.portfoliosSection}>
        <PortfoliosGame
          offersSeries={offersSeries ?? null}
          portfolios={portfolios ?? null}
          onPortfolioSubmit={onPortfolioSubmit}
          isPortfolioSubmitInProgress={isPortfolioSubmitInProgress}
        />
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

  const handleJoinButtonClick = async () => {
    if (tournament.isTonConnected) {
      const result = await tonConnectUI.sendTransaction(
        prepareSendTransaction(VITE_TON_TOURNAMENT_ADDRESS, tournament.entryPrice),
      );

      if (result?.boc) {
        onJoinTournamentButtonClick(wallet?.account.address);
      }

      return;
    }

    onJoinTournamentButtonClick('');
  };

  const renderJoinButton = () => {
    if (tournament.isTonConnected && !wallet?.account.address) {
      return <TonConnectButton className={styles.viewDetailsButton} />;
    }

    return (
      <Button
        className={styles.joinTournamentButton}
        disabled={!canJoinTournament}
        onClick={handleJoinButtonClick}
        loading={isTournamentJoiningInProgress}
      >
        Join for {tournament.entryPrice} {tournamentTicker}
      </Button>
    );
  };

  const renderParticipationInfo = () => {
    if (tournamentParticipation === undefined || tournamentParticipationRank === undefined) {
      return null;
    }

    if (tournamentParticipation === null) {
      return <Typography>—</Typography>;
    }

    return (
      <>
        <Typography variant="h1">{tournamentParticipationRank}</Typography>
        <ColoredPoints points={tournamentParticipation.points} />
      </>
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
      {!tournamentParticipation && isRegistrationOpen && (
        <div className={styles.joinTournamentSection}>{renderJoinButton()}</div>
      )}
      <div className={styles.participationInfoContainer}>
        <LabeledContent title="Your Rank">{renderParticipationInfo()}</LabeledContent>
      </div>
      <div className={styles.tournamentPrizeInfo}>
        <LabeledContent title="Prize Pool">
          <CoinsDisplay
            coins={tournament.participantsCount * tournament.entryPrice + tournament.staticPrizePool}
            tokenImageSrc={tournament.isTonConnected ? '/images/ton-token.png' : '/images/token.png'}
          ></CoinsDisplay>
        </LabeledContent>
        <LabeledContent title="Participants">
          <Typography alignment="right" variant="body2">
            {tournament.participantsCount}
          </Typography>
        </LabeledContent>
      </div>
      <div className={styles.detailsSections}>
        {renderPortfoliosSection()}
        {renderLeaderboardSection()}
      </div>
    </div>
  );
};

export default TournamentDetails;
