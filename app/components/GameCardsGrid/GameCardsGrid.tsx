import { ReactNode } from 'react';
import clsx from 'clsx';
import { GameCard } from '@api/GameCardApi';
import GameCardPreview from '@components/GameCardPreview';
import styles from './GameCardsGrid.module.scss';

export interface GameCardsGridProps {
  className?: string;
  previewCardClassName?: string | ((card: GameCard) => string);
  gameCards: GameCard[];
  onCardClick?: (card: GameCard) => void;
  renderPreviewCardFooter?: (card: GameCard) => ReactNode;
}

const GameCardsGrid = ({
  className,
  previewCardClassName,
  gameCards,
  onCardClick,
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
            size="small"
            previewFooter={renderPreviewCardFooter?.(gameCard)}
          />
        );
      })}
    </div>
  );
};

export default GameCardsGrid;
