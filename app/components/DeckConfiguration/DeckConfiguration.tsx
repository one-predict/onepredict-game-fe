import { useCallback, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { nanoid } from 'nanoid';
import _ from 'lodash';
import { GameCard, GameCardId } from '@api/GameCardApi';
import { TournamentDeck } from '@api/TournamentDeck';
import Loader from '@components/Loader';
import Typography from '@components/Typography';
import GameCardsGrid from '@components/GameCardsGrid';
import Button from '@components/Button';
import DeckConfigurationCard from './DeckConfigurationCard';
import DeckConfigurationButton from './DeckConfigurationButton';
import styles from './DeckConfiguration.module.scss';

export interface DeckConfigurationProps {
  className?: string;
  myDeck: TournamentDeck | null | undefined;
  myCards: Array<GameCard> | undefined;
  availableSlots: number | undefined;
  onObserveCard: (card: GameCard) => void;
  onSaveChanges: (cardIds: GameCardId[]) => void;
  isDeckSaveInProgress?: boolean;
}

const DeckConfiguration = ({
  className,
  myDeck,
  availableSlots,
  myCards,
  onSaveChanges,
  onObserveCard,
  isDeckSaveInProgress,
}: DeckConfigurationProps) => {
  const [isCardSelectingInProgress, setIsCardSelectingInProgress] = useState(false);

  const [deckConfiguration, setDeckConfiguration] = useState<
    Array<{
      id: string;
      cardId: GameCardId;
    }>
  >([]);

  useEffect(() => {
    setDeckConfiguration((previousDeckConfiguration) => {
      return (
        myDeck?.cardIds.map((cardId, index) => {
          const previousDeckItem = previousDeckConfiguration[index];

          return {
            id: previousDeckItem?.cardId === cardId ? previousDeckItem.id : nanoid(),
            cardId,
          };
        }) || []
      );
    });
  }, [myDeck?.cardIds]);

  const myCardsPool = useMemo(() => _.keyBy(myCards, 'id'), [myCards]);

  const currentCountedCards = useMemo(() => {
    return _.countBy(deckConfiguration, (configuration) => configuration.cardId);
  }, [deckConfiguration]);

  const derivedCountedCards = useMemo(() => {
    return _.countBy(myDeck?.cardIds || []);
  }, [myDeck?.cardIds]);

  const isDeckChanged = useMemo(() => {
    return !_.isEqual(currentCountedCards, derivedCountedCards);
  }, [currentCountedCards, derivedCountedCards]);

  const checkCardUnavailable = useCallback(
    (card: GameCard) => {
      return isCardSelectingInProgress && currentCountedCards[card.id] >= 2;
    },
    [currentCountedCards, isCardSelectingInProgress],
  );

  const handleCardClick = useCallback(
    (card: GameCard) => {
      if (!isCardSelectingInProgress) {
        onObserveCard(card);

        return;
      }

      if (checkCardUnavailable(card)) {
        return;
      }

      setDeckConfiguration((previousDeckConfiguration) => {
        return [...previousDeckConfiguration, { id: nanoid(), cardId: card.id }];
      });

      setIsCardSelectingInProgress(false);
    },
    [
      isCardSelectingInProgress,
      onObserveCard,
      setDeckConfiguration,
      setIsCardSelectingInProgress,
      checkCardUnavailable,
    ],
  );

  const handleRemoveCardButtonClick = useCallback(
    (deckItemIdToRemove: string) => {
      setDeckConfiguration((previousDeckConfiguration) => {
        return previousDeckConfiguration.filter(({ id }) => id !== deckItemIdToRemove);
      });
    },
    [setDeckConfiguration],
  );

  const handleAddCardButtonClick = useCallback(() => {
    setIsCardSelectingInProgress((previousIsCardSelectingInProgress) => !previousIsCardSelectingInProgress);
  }, [setIsCardSelectingInProgress]);

  const handleSaveChangesButtonClick = useCallback(() => {
    const deckCardIds = deckConfiguration.map(({ cardId }) => cardId);

    onSaveChanges(deckCardIds);
  }, [onSaveChanges, deckConfiguration]);

  const getPreviewClassName = useCallback(
    (card: GameCard) => {
      if (checkCardUnavailable(card)) {
        return styles.unavailableCard;
      }

      return isCardSelectingInProgress && styles.shakingCard;
    },
    [checkCardUnavailable, isCardSelectingInProgress],
  );

  if (!myCards || !availableSlots) {
    return <Loader centered />;
  }

  const renderMyCardsSection = () => {
    if (myCards.length === 0) {
      return (
        <Typography className={styles.noCardsText} alignment="center" variant="subtitle1">
          You don't have any cards yet.
        </Typography>
      );
    }

    return (
      <GameCardsGrid onCardClick={handleCardClick} previewCardClassName={getPreviewClassName} gameCards={myCards} />
    );
  };

  return (
    <div className={clsx(styles.deckConfiguration, className)}>
      <div className={styles.deckStickyWrapper}>
        <div className={styles.deck}>
          {new Array(availableSlots).fill(null).map((_, index) => {
            const deckItem = deckConfiguration[index];

            if (deckItem) {
              const card = myCardsPool[deckItem.cardId];

              return (
                <DeckConfigurationCard
                  deckItemId={deckItem.id}
                  key={deckItem.id}
                  cardIndex={index}
                  card={card}
                  onRemoveCardButtonClick={handleRemoveCardButtonClick}
                />
              );
            }

            return (
              <DeckConfigurationButton
                key={index}
                index={index}
                deckCardsCount={deckConfiguration.length}
                isCardSelectingInProgress={isCardSelectingInProgress}
                onAddDeckCardButtonClick={handleAddCardButtonClick}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.myCardsContainer}>
        <Typography alignment="center" color="gradient1" variant="h1">
          My Cards
        </Typography>
        {renderMyCardsSection()}
      </div>
      {myDeck !== undefined && isDeckChanged && (
        <Button
          loading={isDeckSaveInProgress}
          onClick={handleSaveChangesButtonClick}
          className={styles.saveChangesButton}
        >
          Save Changes
        </Button>
      )}
    </div>
  );
};

export default DeckConfiguration;
