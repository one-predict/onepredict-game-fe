import { useCallback, useMemo, useState } from 'react';
import { useNavigate, useParams } from '@remix-run/react';
import { GameCardId } from '@api/GameCardApi';
import { PortfolioSelectedToken } from '@api/PortfolioApi';
import AppSection from '@enums/AppSection';
import useTournamentByIdQuery from '@hooks/queries/useTournamentByIdQuery';
import useTournamentParticipationRankQuery from '@hooks/queries/useTournamentParticipationRankQuery';
import useTournamentParticipationQuery from '@hooks/queries/useTournamentParticipationQuery';
import useTournamentLeaderboardQuery from '@hooks/queries/useTournamentLeaderboardQuery';
import useTournamentStatus from '@hooks/useTournamentStatus';
import useSession from '@hooks/useSession';
import useMyInventoryQuery from '@hooks/queries/useMyInventoryQuery';
import useMyTournamentDeck from '@hooks/queries/useMyTournamentDeck';
import useGameCardsByIdsQuery from '@hooks/queries/useGameCardsByIdsQuery';
import useUpdateTournamentDeckMutation from '@hooks/mutations/useUpdateTournamentDeckMutation';
import useLatestTokensOffersQuery from '@hooks/queries/useLatestTokensOffersQuery';
import useMyPortfoliosQuery from '@hooks/queries/useMyPortfoliosQuery';
import useBackButton from '@hooks/useBackButton';
import useJoinTournamentMutation from '@hooks/mutations/useJoinTournamentMutation';
import useCreatePortfolioMutation from '@hooks/mutations/useCreatePortfolioMutation';
import PageBody from '@components/PageBody';
import Typography from '@components/Typography';
import Loader from '@components/Loader';
import ColoredPoints from '@components/ColoredPoints';
import LabeledContent from '@components/LabeledContent';
import TournamentDetails from '@components/TournamentDetails';
import DeckConfiguration from '@components/DeckConfiguration';
import PortfoliosGame from '@components/PortfoliosGame';
import FixedSlideView from '@components/FixedSlideView';
import styles from './tournament.module.scss';

export const handle = {
  background: {
    image: '/images/tournament-page-background.png',
    position: 'center',
    overlay: true,
  },
  appSection: AppSection.Tournaments,
};

const TournamentPage = () => {
  const navigate = useNavigate();

  const { id: tournamentId } = useParams<{ id: string }>();

  const [showDeckConfiguration, setShowDeckConfiguration] = useState(false);
  const [showPortfolios, setShowPortfolios] = useState(false);

  const currentUser = useSession();

  const { data: tournament } = useTournamentByIdQuery(tournamentId || '');
  const { data: tournamentParticipation } = useTournamentParticipationQuery(tournament?.id || '');
  const { data: tournamentParticipationRank } = useTournamentParticipationRankQuery(tournament?.id || '');
  const { data: tournamentLeaderboard } = useTournamentLeaderboardQuery(tournament?.id || '');
  const { data: myInventory } = useMyInventoryQuery();
  const { data: tournamentDeck } = useMyTournamentDeck(tournamentId || '');
  const { data: myCards } = useGameCardsByIdsQuery(myInventory?.purchasedCardIds || []);

  const tournamentStatus = useTournamentStatus(tournament ?? null);

  const { data: tournamentOffers } = useLatestTokensOffersQuery(tournamentStatus !== 'live' ? tournamentId : undefined);

  const tournamentOfferIds = useMemo(() => tournamentOffers?.map((offer) => offer.id), [tournamentOffers]);

  const { data: portfolios } = useMyPortfoliosQuery(tournamentOfferIds);

  const { mutateAsync: joinTournament, status: joinTournamentMutationStatus } = useJoinTournamentMutation();
  const { mutateAsync: updateCardsDeck, status: updateCardsDeckStatus } = useUpdateTournamentDeckMutation();
  const { mutateAsync: createPortfolio, status: createPortfolioStatus } = useCreatePortfolioMutation();

  const canJoinTournament =
    tournamentStatus === 'upcoming' && !!currentUser && currentUser.coinsBalance > tournament?.entryPrice;

  useBackButton(
    true,
    () => {
      if (showDeckConfiguration) {
        setShowDeckConfiguration(false);

        return;
      }

      if (showPortfolios) {
        setShowPortfolios(false);

        return;
      }

      navigate('/tournaments');
    },
    [showDeckConfiguration, showPortfolios],
  );

  const handleJoinTournamentButtonClick = async () => {
    if (!tournament) {
      return;
    }

    await joinTournament(tournament.id);
  };

  const handleSaveDeckChanges = useCallback(
    async (cardIds: GameCardId[]) => {
      if (!tournamentDeck) {
        return;
      }

      await updateCardsDeck({ id: tournamentDeck.id, cardIds });
    },
    [tournamentDeck, updateCardsDeck],
  );

  const handlePortfolioSubmit = useCallback(
    async (offerId: string, selectedTokens: PortfolioSelectedToken[]) => {
      await createPortfolio({ offerId, selectedTokens });
    },
    [createPortfolio],
  );

  const renderParticipationContent = () => {
    if (!tournament || tournamentParticipation === undefined || tournamentParticipationRank === undefined) {
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
    <PageBody>
      <div className={styles.tournamentParticipationInfoContainer}>
        <LabeledContent title="Rank">{renderParticipationContent()}</LabeledContent>
      </div>
      {tournament && tournamentParticipation !== undefined ? (
        <TournamentDetails
          tournament={tournament}
          tournamentLeaderboard={tournamentLeaderboard}
          tournamentParticipation={tournamentParticipation}
          tournamentDeck={tournamentDeck}
          tournamentOffers={tournamentOffers}
          myInventory={myInventory}
          joinTournamentMutationStatus={joinTournamentMutationStatus}
          currentUser={currentUser}
          canJoinTournament={canJoinTournament}
          isTournamentJoiningInProgress={joinTournamentMutationStatus === 'pending'}
          onJoinTournamentButtonClick={handleJoinTournamentButtonClick}
          onConfigureDeckButtonClick={() => setShowDeckConfiguration(true)}
          onPortfoliosButtonClick={() => setShowPortfolios(true)}
        />
      ) : (
        <Loader centered />
      )}
      <FixedSlideView visible={showPortfolios || showDeckConfiguration}>
        {showDeckConfiguration && (
          <DeckConfiguration
            className={styles.deckConfiguration}
            myDeck={tournamentDeck}
            myCards={myCards}
            availableSlots={myInventory?.availableCardSlots}
            onSaveChanges={handleSaveDeckChanges}
            isDeckSaveInProgress={updateCardsDeckStatus === 'pending'}
          />
        )}
        {showPortfolios && (
          <>
            <LabeledContent className={styles.portfoliosTournamentDescription} row title="Tournament:">
              <Typography variant="h6">{tournament?.title}</Typography>
            </LabeledContent>
            <PortfoliosGame
              className={styles.portfoliosGame}
              offers={tournamentOffers ?? null}
              portfolios={portfolios ?? null}
              onPortfolioSubmit={handlePortfolioSubmit}
              isPortfolioSubmitInProgress={createPortfolioStatus === 'pending'}
            />
          </>
        )}
      </FixedSlideView>
    </PageBody>
  );
};

export default TournamentPage;
