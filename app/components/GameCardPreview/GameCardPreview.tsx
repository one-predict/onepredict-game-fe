import { ReactNode, useMemo, MouseEvent } from 'react';
import clsx from 'clsx';
import { GameCard, GameCardRarity } from '@api/GameCardApi';
import useAnimationEffect from '@hooks/useAnimationEffect';
import Typography, { TypographyProps } from '@components/Typography';
import InfoIcon from '@assets/icons/info.svg?react';
import styles from './GameCardPreview.module.scss';

export interface GameCardPreview {
  card: GameCard;
  cardPreviewTitleVariant?: TypographyProps['variant'];
  onClick?: (card: GameCard) => void;
  onInfoIconClick?: (card: GameCard) => void;
  className?: string;
  allowEffect?: boolean;
  overlay?: ReactNode;
  previewFooter?: ReactNode;
}

const EFFECT_TIMEOUT = 600; // ms

const GameCardPreview = ({
  className,
  card,
  onClick,
  onInfoIconClick,
  previewFooter,
  overlay,
  allowEffect,
  cardPreviewTitleVariant = 'h6',
}: GameCardPreview) => {
  const [effectId, showEffect] = useAnimationEffect(EFFECT_TIMEOUT);

  const imageUrlPath = useMemo(() => {
    return card.name.split(' ').join('-').toLowerCase();
  }, [card]);

  const handlePreviewClick = () => {
    onClick?.(card);

    if (allowEffect) {
      showEffect();
    }
  };

  const handleInfoIconClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    onInfoIconClick?.(card);
  };

  const cardPreviewComposedClassName = clsx(
    styles.gameCardPreview,
    {
      [styles.commonGameCardPreview]: card.rarity === GameCardRarity.Common,
      [styles.rareGameCardPreview]: card.rarity === GameCardRarity.Rare,
      [styles.epicGameCardPreview]: card.rarity === GameCardRarity.Epic,
      [styles.legendaryGameCardPreview]: card.rarity === GameCardRarity.Legendary,
    },
    className,
  );

  return (
    <div onClick={handlePreviewClick} className={cardPreviewComposedClassName}>
      <div className={styles.gameCardPreviewHead}>
        <Typography variant={cardPreviewTitleVariant} className={styles.cardName}>
          {card.name}
        </Typography>
      </div>
      <div className={styles.gameCardPreviewContent}>
        <img className={styles.gameCardPreviewImage} src={`/images/cards/${imageUrlPath}.png`} alt={`${card.name}`} />
      </div>
      {previewFooter && <div className={styles.gameCardPreviewFooter}>{previewFooter}</div>}
      {!!effectId && <div key={effectId} className={styles.effect} />}
      {onInfoIconClick && (
        <div onClick={handleInfoIconClick} className={styles.infoIconContainer}>
          <InfoIcon className={styles.infoIcon} />
        </div>
      )}
      {overlay && <div className={styles.gameCardPreviewOverlay}>{overlay}</div>}
    </div>
  );
};

export default GameCardPreview;
