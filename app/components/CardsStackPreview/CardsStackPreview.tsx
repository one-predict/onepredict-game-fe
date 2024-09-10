import { useMemo } from 'react';
import { GameCardId } from '@api/GameCardApi';
import useGameCardsByIdsQuery from '@hooks/queries/useGameCardsByIdsQuery';
import GameCardPreview from '@components/GameCardPreview';
import Typography from '@components/Typography';
import styles from './CardsStackPreview.module.scss';

export interface CardsStackPreviewProps {
  stack: Record<string, number>;
  noCardsText?: string;
}

const CardsStackPreview = ({ stack, noCardsText = 'No Cards' }: CardsStackPreviewProps) => {
  const cardIds = useMemo(() => Object.keys(stack) as GameCardId[], [stack]);

  const { data: cards } = useGameCardsByIdsQuery(cardIds);

  return (
    <div className={styles.stackCardsPreview}>
      {!cards && <div>Loading...</div>}
      {cards &&
        cards.map((card) => {
          return (
            <GameCardPreview
              key={card.id}
              className={styles.gameCardPreview}
              previewFooter={
                <div className={styles.gameCardPreviewFooter}>
                  <Typography variant="h6">x{stack[card.id]}</Typography>
                </div>
              }
              card={card}
            />
          );
        })}
      {!cards.length && (
        <Typography color="gray" className={styles.noCardsText} variant="h4">
          {noCardsText}
        </Typography>
      )}
    </div>
  );
};

export default CardsStackPreview;
