import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import _ from 'lodash';
import AppSection from '@enums/AppSection';
import { GameCard } from '@api/GameCardApi';
import useGameCardsQuery from '@hooks/queries/useGameCardsQuery';
import usePurchaseCardMutation from '@hooks/mutations/usePurchaseCardMutation';
import useSession from '@hooks/useSession';
import useMyInventoryQuery from '@hooks/queries/useMyInventoryQuery';
import CardsMarketplace from '@components/CardsMarketplace';
import Typography from '@components/Typography';
import BuyGameCardPopup from '@components/BuyGameCardPopup';
import PageBody from '@components/PageBody';
import Loader from '@components/Loader';
import styles from './store.module.scss';

export const handle = {
  backHref: '/',
  appSection: AppSection.Home,
};

const StorePage = () => {
  const [cardToObserve, setCardToObserve] = useState<GameCard | null>(null);

  const currentUser = useSession();

  const { data: gameCards } = useGameCardsQuery();
  const { data: currentUserInventory } = useMyInventoryQuery();

  const { mutateAsync: purchaseCard, status: purchaseCardStatus } = usePurchaseCardMutation();

  const purchasedCardsPool = useMemo(() => {
    return currentUserInventory ? _.keyBy(currentUserInventory?.purchasedCardIds) : null;
  }, [currentUserInventory]);

  const checkIfCardIsPurchased = useCallback(
    (card: GameCard) => {
      return !!purchasedCardsPool?.[card.id];
    },
    [purchasedCardsPool],
  );

  const handleCardClick = useCallback(
    (card: GameCard) => {
      setCardToObserve(card);
    },
    [setCardToObserve],
  );

  const handleBuyCardClick = useCallback(async () => {
    if (!cardToObserve) {
      return;
    }

    await purchaseCard(cardToObserve.id);

    toast(`You have successfully purchased the card!`);

    setCardToObserve(null);
  }, [purchaseCard, cardToObserve]);

  return (
    <PageBody>
      <Typography className={styles.storePageTitle} alignment="center" color="gradient1" variant="h1">
        Store
      </Typography>
      {gameCards && purchasedCardsPool ? (
        <CardsMarketplace
          className={styles.marketplace}
          gameCards={gameCards}
          isCardPurchased={checkIfCardIsPurchased}
          onCardClick={handleCardClick}
        />
      ) : (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      )}
      <BuyGameCardPopup
        isOpen
        userBalance={currentUser?.coinsBalance ?? null}
        onBuyCardClick={handleBuyCardClick}
        isBuyInProgress={purchaseCardStatus === 'pending'}
        isCardAlreadyPurchased={!!cardToObserve && checkIfCardIsPurchased(cardToObserve)}
        onClose={() => setCardToObserve(null)}
        card={cardToObserve}
      />
    </PageBody>
  );
};

export default StorePage;
