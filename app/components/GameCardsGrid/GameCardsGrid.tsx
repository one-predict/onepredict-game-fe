import { ReactNode } from 'react';
import clsx from 'clsx';
import { GameCard } from '@api/GameCardApi';
import GameCardPreview from '@components/GameCardPreview';
import styles from './GameCardsGrid.module.scss';

export interface GameCardsGridProps {
  className?: string;
  previewCardClassName?: string | ((card: GameCard) => string);
  gameCards: GameCard[];
  isEffectAllowed?: (card: GameCard) => boolean;
  onCardClick?: (card: GameCard) => void;
  onCardInfoIconClick?: (card: GameCard) => void;
  renderPreviewCardOverlay?: (card: GameCard) => ReactNode;
  renderPreviewCardFooter?: (card: GameCard) => ReactNode;
}

const GameCardsGrid = ({
  className,
  previewCardClassName,
  gameCards,
  onCardClick,
  onCardInfoIconClick,
  isEffectAllowed,
  renderPreviewCardOverlay,
  renderPreviewCardFooter,
}: GameCardsGridProps) => {
  return (
    <div className={clsx(styles.gameCardsGrid, className)}>
      {gameCards.map((gameCard) => {
        const gameCardPreviewClassName =
          typeof previewCardClassName === 'function' ? previewCardClassName(gameCard) : previewCardClassName;

        return (
          <GameCardPreview
            key={gameCard.id}
            card={gameCard}
            className={gameCardPreviewClassName}
            onClick={onCardClick}
            allowEffect={isEffectAllowed?.(gameCard)}
            onInfoIconClick={onCardInfoIconClick}
            overlay={renderPreviewCardOverlay?.(gameCard)}
            previewFooter={renderPreviewCardFooter?.(gameCard)}
          />
        );
      })}
    </div>
  );
};

export default GameCardsGrid;
