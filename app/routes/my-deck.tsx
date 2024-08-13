import { useCallback, useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import _ from 'lodash';
import AppSection from '@enums/AppSection';
import { GameCard, GameCardId } from '@api/GameCardApi';
import useMyInventoryQuery from '@hooks/queries/useMyInventoryQuery';
import useGameCardsByIdsQuery from '@hooks/queries/useGameCardsByIdsQuery';
import useMyCardsDeckQuery from '@hooks/queries/useMyCardsDeckQuery';
import useCreateCardsDeckMutation from '@hooks/mutations/useCreateCardsDeckMutation';
import useUpdateCardsDeckMutation from '@hooks/mutations/useUpdateCardsDeckMutation';
import Typography from '@components/Typography';
import Loader from '@components/Loader';
import Button from '@components/Button';
import DeckConfiguration from '@components/DeckConfiguration';
import GameCardsGrid from '@components/GameCardsGrid';
import PageBody from '@components/PageBody';
import GameCardDetailsPopup from '@components/GameCardDetailsPopup';
import styles from './my-deck.module.scss';

export const handle = {
  backHref: '/',
  appSection: AppSection.Home,
};

const MAX_CARDS_WITH_SAME_ID = 2;

const MyDeckPage = () => {
  const [cardToObserve, setCardToObserve] = useState<GameCard | null>(null);
  const [isCardSelectingInProgress, setIsCardSelectingInProgress] = useState(false);

  const [deckConfiguration, setDeckConfiguration] = useState<
    Array<{
      id: string;
      cardId: GameCardId;
    }>
  >([]);

  const { data: myInventory } = useMyInventoryQuery();
  const { data: myDeck } = useMyCardsDeckQuery();
  const { data: myCards } = useGameCardsByIdsQuery(myInventory?.purchasedCardIds || []);

  const { mutateAsync: createCardsDeck, status: createCardsDeckStatus } = useCreateCardsDeckMutation();
  const { mutateAsync: updateCardsDeck, status: updateCardsDeckStatus } = useUpdateCardsDeckMutation();

  const myCardsPool = useMemo(() => _.keyBy(myCards, 'id'), [myCards]);

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
      return isCardSelectingInProgress && currentCountedCards[card.id] >= MAX_CARDS_WITH_SAME_ID;
    },
    [currentCountedCards, isCardSelectingInProgress],
  );

  const handleCardClick = useCallback(
    (card: GameCard) => {
      if (!isCardSelectingInProgress) {
        setCardToObserve(card);

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
      setCardToObserve,
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

  const handleSaveChangesButtonClick = useCallback(async () => {
    const deckCardIds = deckConfiguration.map(({ cardId }) => cardId);

    if (myDeck) {
      await updateCardsDeck({ id: myDeck.id, cardIds: deckCardIds });
    } else {
      await createCardsDeck({ cardIds: deckCardIds });
    }

    toast(`Your deck has been successfully updated.`);
  }, [createCardsDeck, updateCardsDeck, deckConfiguration, myDeck]);

  const getPreviewClassName = useCallback(
    (card: GameCard) => {
      if (checkCardUnavailable(card)) {
        return styles.unavailableCard;
      }

      return isCardSelectingInProgress && styles.shakingCard;
    },
    [checkCardUnavailable, isCardSelectingInProgress],
  );

  return (
    <PageBody className={styles.pageBody}>
      <div className={styles.deckConfigurationContainer}>
        <Typography alignment="center" variant="h1">
          Your Deck:
        </Typography>
        {myInventory && myDeck !== undefined && myCards !== undefined ? (
          <DeckConfiguration
            cardsPool={myCardsPool}
            deck={deckConfiguration}
            className={styles.deckConfiguration}
            availableSlots={myInventory.availableCardSlots}
            onRemoveCardButtonClick={handleRemoveCardButtonClick}
            onAddCardButtonClick={handleAddCardButtonClick}
            isCardSelectingInProgress={isCardSelectingInProgress}
          />
        ) : (
          <Loader className={styles.loader} />
        )}
      </div>
      <div className={styles.myCardsContainer}>
        <Typography alignment="center" color="gradient1" variant="h1">
          My Cards:
        </Typography>
        {myCards ? (
          <GameCardsGrid onCardClick={handleCardClick} previewCardClassName={getPreviewClassName} gameCards={myCards} />
        ) : (
          <Loader className={styles.loader} />
        )}
      </div>
      {myDeck !== undefined && isDeckChanged && (
        <Button
          loading={createCardsDeckStatus === 'pending' || updateCardsDeckStatus === 'pending'}
          onClick={handleSaveChangesButtonClick}
          className={styles.saveChangesButton}
        >
          Save Changes
        </Button>
      )}
      <GameCardDetailsPopup isOpen card={cardToObserve} onClose={() => setCardToObserve(null)} />
    </PageBody>
  );
};

export default MyDeckPage;
