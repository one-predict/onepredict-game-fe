import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { GameCard, GameCardId } from '@api/GameCardApi';
import GameCardPreview from '@components/GameCardPreview';
import Typography from '@components/Typography';
import TrashIcon from '@assets/icons/trash.svg?react';
import styles from './StackConfigurationCardPreview.module.scss';

export interface StackConfigurationCardPreviewProps {
  card: GameCard;
  quantity: number;
  onRemoveCardButtonClick: (cardId: GameCardId) => void;
}

const HIDE_REMOVE_CARD_OVERLAY_TIMEOUT = 5000;

const StackConfigurationCardPreview = ({
  card,
  onRemoveCardButtonClick,
  quantity,
}: StackConfigurationCardPreviewProps) => {
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
    onRemoveCardButtonClick(card.id);
  };

  return (
    <div className={styles.stackConfigurationCardContainer}>
      <GameCardPreview
        onClick={handleCardPreviewClick}
        card={card}
        previewFooter={
          <div className={styles.gameCardPreviewFooter}>
            <Typography variant="h6">x{quantity}</Typography>
          </div>
        }
      />
      <div className={clsx(styles.removeCardOverlay, showRemoveCardOverlay && styles.visibleRemoveCardOverlay)}>
        <TrashIcon onClick={handleTrashIconClick} />
      </div>
    </div>
  );
};

export default StackConfigurationCardPreview;
