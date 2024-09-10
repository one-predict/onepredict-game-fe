import { useMemo } from 'react';
import { GameCard } from '@api/GameCardApi';
import { TournamentDeck } from '@api/TournamentDeck';
import CardsStackConfiguration from '@components/CardsStackConfiguration';

export interface DeckConfigurationProps {
  className?: string;
  myDeck: TournamentDeck | null | undefined;
  myCardsPool: Record<string, GameCard> | undefined;
  availableSlots: number | undefined;
  onObserveCard: (card: GameCard) => void;
  onSaveChanges: (cardsStack: Record<string, number>) => void;
  isSaveInProgress?: boolean;
}

const DeckConfiguration = ({
  className,
  myDeck,
  availableSlots,
  myCardsPool,
  onSaveChanges,
  onObserveCard,
  isSaveInProgress,
}: DeckConfigurationProps) => {
  const availableCardsSupply = useMemo(() => {
    if (!myCardsPool) {
      return undefined;
    }

    return Object.keys(myCardsPool).reduce(
      (previousSupply, cardId) => {
        previousSupply[cardId] = 2;

        return previousSupply;
      },
      {} as Record<string, number>,
    );
  }, [myCardsPool]);

  return (
    <CardsStackConfiguration
      className={className}
      stackTitle="Deck Cards"
      availableCardsSectionTitle="Available Cards"
      stack={myDeck?.cardsStack}
      stackSlots={availableSlots}
      cardsPool={myCardsPool}
      availableCardsSupply={availableCardsSupply}
      onSaveChanges={onSaveChanges}
      onObserveCard={onObserveCard}
      isStackSaveInProgress={isSaveInProgress}
    />
  );
};

export default DeckConfiguration;
