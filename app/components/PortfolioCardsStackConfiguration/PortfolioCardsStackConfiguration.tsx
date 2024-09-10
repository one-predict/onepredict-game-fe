import { useMemo } from 'react';
import { GameCard } from '@api/GameCardApi';
import { Tournament } from '@api/TournamentApi';
import { TournamentDeck } from '@api/TournamentDeck';
import { Portfolio } from '@api/PortfolioApi';
import CardsStackConfiguration from '@components/CardsStackConfiguration';
import { getTournamentRoundByTimestamp } from '@utils/tournament-rounds';

export interface PortfolioCardsStackConfigurationProps {
  className?: string;
  portfolio: Portfolio;
  tournament: Tournament | undefined;
  deck: TournamentDeck | null | undefined;
  cardsPool: Record<string, GameCard> | undefined;
  availableSlots: number | undefined;
  onObserveCard: (card: GameCard) => void;
  onSaveChanges: (stack: Record<string, number>) => void;
  isSaveInProgress?: boolean;
}

const PortfolioCardsStackConfiguration = ({
  className,
  deck,
  tournament,
  portfolio,
  availableSlots,
  cardsPool,
  onSaveChanges,
  onObserveCard,
  isSaveInProgress,
}: PortfolioCardsStackConfigurationProps) => {
  const roundUsedCardsStack = useMemo(() => {
    if (!tournament || !deck) {
      return undefined;
    }

    const [portfolioStartTimestamp] = portfolio.interval;

    const portfolioRoundInTournament = getTournamentRoundByTimestamp(
      portfolioStartTimestamp,
      tournament.startTimestamp,
      tournament.roundDurationInSeconds,
    );

    return deck.usedCardsStackByRound[portfolioRoundInTournament] || {};
  }, [tournament, deck, portfolio]);

  const availableCardsSupply = useMemo(() => {
    if (!deck || !roundUsedCardsStack) {
      return undefined;
    }

    const supply: Record<string, number> = {};

    for (const cardId in deck.cardsStack) {
      const usedCardCount = deck.allUsedCardsStack[cardId] || 0;

      // We should include current round used cards count to the supply
      const roundUsedCardCount = roundUsedCardsStack[cardId] || 0;

      supply[cardId] = deck.cardsStack[cardId] - usedCardCount + roundUsedCardCount;
    }

    return supply;
  }, [deck, roundUsedCardsStack]);

  return (
    <CardsStackConfiguration
      className={className}
      stackTitle="Portfolio Cards"
      availableCardsSectionTitle="Available Cards"
      stack={roundUsedCardsStack}
      stackSlots={availableSlots}
      cardsPool={cardsPool}
      availableCardsSupply={availableCardsSupply}
      onSaveChanges={onSaveChanges}
      onObserveCard={onObserveCard}
      isStackSaveInProgress={isSaveInProgress}
    />
  );
};

export default PortfolioCardsStackConfiguration;
