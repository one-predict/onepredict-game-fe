import { useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import AppSection from '@enums/AppSection';
import { GameCard } from '@api/GameCardApi';
import useGameCardsQuery from '@hooks/queries/useGameCardsQuery';
import usePurchaseCardMutation from '@hooks/mutations/usePurchaseCardMutation';
import useSession from '@hooks/useSession';
import useMyInventoryQuery from '@hooks/queries/useMyInventoryQuery';
import CardsMarketplace from '@components/CardsMarketplace';
import BuyGameCardPopup from '@components/BuyGameCardPopup';
import PageBody from '@components/PageBody';
import ButtonsToggle from '@components/ButtonsToggle';
import Typography from '@components/Typography';
import styles from './store.module.scss';

export const handle = {
  backHref: '/',
  appSection: AppSection.Store,
  background: {
    image: '/images/store-page-background.png',
    overlay: true,
  },
};

const StorePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('cards');

  const [cardToObserve, setCardToObserve] = useState<GameCard | null>(null);

  const currentUser = useSession();

  const { data: gameCards } = useGameCardsQuery();
  const { data: currentUserInventory } = useMyInventoryQuery();

  const { mutateAsync: purchaseCard, status: purchaseCardStatus } = usePurchaseCardMutation();

  const purchasedGameCardsPool = useMemo(() => {
    return currentUserInventory ? _.keyBy(currentUserInventory?.purchasedCardIds) : undefined;
  }, [currentUserInventory]);

  const handleGameCardClick = useCallback(
    (card: GameCard) => {
      setCardToObserve(card);
    },
    [setCardToObserve],
  );

  const handlePurchaseCard = useCallback(async () => {
    if (!cardToObserve) {
      return;
    }

    await purchaseCard(cardToObserve.id);

    setCardToObserve(null);
  }, [purchaseCard, cardToObserve]);

  return (
    <PageBody>
      <ButtonsToggle
        onSwitch={(category) => setSelectedCategory(category)}
        toggles={[
          {
            title: 'Cards',
            id: 'cards',
          },
          {
            title: 'Perks',
            id: 'perks',
          },
        ]}
        selectedId={selectedCategory}
      />
      <div className={styles.categoryBody}>
        <div className={styles.comingSoonSection}>
          <Typography variant="h2">{_.upperFirst(selectedCategory)} are coming soon!</Typography>
        </div>
        {selectedCategory === 'cards' && (
          <>
            <CardsMarketplace
              className={styles.cardsMarketplace}
              gameCards={gameCards}
              purchasedCardsPool={purchasedGameCardsPool}
              onCardClick={handleGameCardClick}
              onPurchaseCard={handlePurchaseCard}
            />
            <BuyGameCardPopup
              isOpen={!!cardToObserve}
              card={cardToObserve}
              userBalance={currentUser?.coinsBalance ?? null}
              onBuyCardClick={handlePurchaseCard}
              isBuyInProgress={purchaseCardStatus === 'pending'}
              isCardAlreadyPurchased={!!cardToObserve && !!purchasedGameCardsPool?.[cardToObserve.id]}
              onClose={() => setCardToObserve(null)}
            />
          </>
        )}
      </div>
    </PageBody>
  );
};

export default StorePage;
