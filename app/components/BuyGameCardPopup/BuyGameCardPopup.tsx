import { useMemo } from 'react';
import { GameCard } from '@api/GameCardApi';
import { PopupProps } from '@components/Popup';
import Popup from '@components/Popup';
import GameCardDetails from '@components/GameCardDetails';
import Button from '@components/Button';
import CoinsDisplay from '@components/CoinsDisplay';
import styles from './BuyGameCardPopup.module.scss';

export interface BuyGameCardPopupProps extends Omit<PopupProps, 'children'> {
  card: GameCard | null;
  userBalance: number | null;
  onBuyCardClick: () => void;
  isBuyInProgress?: boolean;
  isCardAlreadyPurchased?: boolean;
}

const BuyGameCardPopup = ({
  userBalance,
  card,
  isOpen,
  isBuyInProgress,
  isCardAlreadyPurchased,
  onBuyCardClick,
  ...popupProps
}: BuyGameCardPopupProps) => {
  const buttonText = useMemo(() => {
    if (isCardAlreadyPurchased) {
      return 'Purchased';
    }

    return userBalance < card?.price ? 'Not enough balance' : 'Buy Now';
  }, [card, userBalance, isCardAlreadyPurchased]);

  return (
    <Popup isOpen={isOpen && !!card && userBalance !== null} {...popupProps}>
      {card && (
        <>
          <GameCardDetails card={card} />
          <div className={styles.buySection}>
            <CoinsDisplay coins={card.price} />
            <Button
              disabled={isCardAlreadyPurchased || userBalance < card.price}
              loading={isBuyInProgress}
              onClick={onBuyCardClick}
            >
              {buttonText}
            </Button>
          </div>
        </>
      )}
    </Popup>
  );
};

export default BuyGameCardPopup;
