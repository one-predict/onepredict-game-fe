import clsx from 'clsx';
import { GameCard } from '@api/GameCardApi';
import GameCardPreview from '@components/GameCardPreview';
import Typography from '@components/Typography';
import styles from './GameCardDetails.module.scss';

export interface GameCardDetailsProps {
  card: GameCard;
  className?: string;
}

const GameCardDetails = ({ className, card }: GameCardDetailsProps) => {
  return (
    <div className={clsx(styles.gameCardDetailsContainer, className)}>
      <GameCardPreview className={styles.gameCardPreview} card={card} />
      <Typography className={styles.gameCardDescription}>{card.description}</Typography>
    </div>
  );
};

export default GameCardDetails;
