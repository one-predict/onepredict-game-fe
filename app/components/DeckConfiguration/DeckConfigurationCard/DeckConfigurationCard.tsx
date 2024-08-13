import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { GameCard } from '@api/GameCardApi';
import GameCardPreview from '@components/GameCardPreview';
import TrashIcon from '@assets/icons/trash.svg?react';
import styles from './DeckConfigurationCard.module.scss';

export interface DeckConfigurationCardProps {
  deckItemId: string;
  card: GameCard;
  cardIndex: number;
  onRemoveCardButtonClick: (deckItemId: string) => void;
}

const HIDE_REMOVE_CARD_OVERLAY_TIMEOUT = 5000;

const DeckConfigurationCard = ({ card, onRemoveCardButtonClick, deckItemId }: DeckConfigurationCardProps) => {
  const [showRemoveCardOverlay, setShowRemoveCardOverlay] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowRemoveCardOverlay(false);
    }, HIDE_REMOVE_CARD_OVERLAY_TIMEOUT);

    return () => clearTimeout(timeoutId);
  }, [showRemoveCardOverlay]);

  const handleCardPreviewClick = () => {
    setShowRemoveCardOverlay(true);
  };

  const handleTrashIconClick = () => {
    onRemoveCardButtonClick(deckItemId);
  };

  return (
    <div className={styles.deckConfigurationCardContainer}>
      <GameCardPreview onClick={handleCardPreviewClick} className={styles.gameCardPreview} card={card} size="small" />
      <div className={clsx(styles.removeCardOverlay, showRemoveCardOverlay && styles.visibleRemoveCardOverlay)}>
        <TrashIcon onClick={handleTrashIconClick} />
      </div>
    </div>
  );
};

export default DeckConfigurationCard;
