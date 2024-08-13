import { GameCard } from '@api/GameCardApi';
import { PopupProps } from '@components/Popup';
import Popup from '@components/Popup';
import GameCardDetails from '@components/GameCardDetails';

export interface BuyGameCardPopupProps extends Omit<PopupProps, 'children' | 'size'> {
  card: GameCard | null;
}

const GameCardDetailsPopup = ({ card, isOpen, ...popupProps }: BuyGameCardPopupProps) => {
  return (
    <Popup isOpen={isOpen && !!card} height={70} size="small" {...popupProps}>
      {card && <GameCardDetails card={card} />}
    </Popup>
  );
};

export default GameCardDetailsPopup;
