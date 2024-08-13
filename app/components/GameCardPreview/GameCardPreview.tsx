import { ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import { GameCard, GameCardRarity } from '@api/GameCardApi';
import Typography from '@components/Typography';
import styles from './GameCardPreview.module.scss';

export interface GameCardPreview {
  card: GameCard;
  onClick?: (card: GameCard) => void;
  className?: string;
  size?: 'small' | 'default';
  previewFooter?: ReactNode;
}

const GameCardPreview = ({ className, card, onClick, size = 'default', previewFooter }: GameCardPreview) => {
  const imageUrlPath = useMemo(() => {
    return card.name.split(' ').join('-').toLowerCase();
  }, [card]);

  const cardPreviewComposedClassName = clsx(
    styles.gameCardPreview,
    {
      [styles.smallSizeGameCardPreview]: size === 'small',
    },
    {
      [styles.commonGameCardPreview]: card.rarity === GameCardRarity.Common,
      [styles.rareGameCardPreview]: card.rarity === GameCardRarity.Rare,
      [styles.epicGameCardPreview]: card.rarity === GameCardRarity.Epic,
      [styles.legendaryGameCardPreview]: card.rarity === GameCardRarity.Legendary,
    },
    className,
  );

  return (
    <div onClick={() => onClick?.(card)} className={cardPreviewComposedClassName}>
      <div className={styles.gameCardPreviewHead}>
        <Typography variant={size === 'small' ? 'h6' : 'h4'} className={styles.cardName}>
          {card.name}
        </Typography>
      </div>
      <div className={styles.gameCardPreviewContent}>
        <img
          className={styles.gameCardPreviewImage}
          src={`/images/cards/${imageUrlPath}-${size}.png`}
          alt={`${card.name}`}
        />
      </div>
      {previewFooter && <div className={styles.gameCardPreviewFooter}>{previewFooter}</div>}
    </div>
  );
};

export default GameCardPreview;
