import clsx from 'clsx';
import { GameCard, GameCardId } from '@api/GameCardApi';
import DeckConfigurationCard from './DeckConfigurationCard';
import DeckConfigurationButton from './DeckConfigurationButton';
import styles from './DeckConfiguration.module.scss';

export interface DeckConfigurationProps {
  className?: string;
  cardsPool: Record<string, GameCard>;
  deck: Array<{ id: string; cardId: GameCardId }>;
  availableSlots: number;
  onAddCardButtonClick: () => void;
  onRemoveCardButtonClick: (deckItemId: string) => void;
  isCardSelectingInProgress?: boolean;
}

const DeckConfiguration = ({
  className,
  onRemoveCardButtonClick,
  deck,
  cardsPool,
  availableSlots,
  isCardSelectingInProgress,
  onAddCardButtonClick,
}: DeckConfigurationProps) => {
  return (
    <div className={clsx(styles.deckConfigurationContainer, className)}>
      {new Array(availableSlots).fill(null).map((_, index) => {
        const deckItem = deck[index];

        if (deckItem) {
          const card = cardsPool[deckItem.cardId];

          return (
            <DeckConfigurationCard
              deckItemId={deckItem.id}
              key={deckItem.id}
              cardIndex={index}
              card={card}
              onRemoveCardButtonClick={onRemoveCardButtonClick}
            />
          );
        }

        return (
          <DeckConfigurationButton
            key={index}
            index={index}
            deckCardsCount={deck.length}
            isCardSelectingInProgress={isCardSelectingInProgress}
            onAddDeckCardButtonClick={onAddCardButtonClick}
          />
        );
      })}
    </div>
  );
};

export default DeckConfiguration;
