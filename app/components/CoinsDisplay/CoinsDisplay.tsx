import Typography, { TypographyProps } from '@components/Typography';
import styles from './CoinsDisplay.module.scss';

export interface CoinsDisplayProps extends TypographyProps {
  coins: number;
}

const CoinsDisplay = ({ coins, ...typographyProps }: CoinsDisplayProps) => {
  return (
    <div className={styles.priceSection}>
      <img src="/images/mini-aipick-coin.png" alt="mini-aipick-coin" />
      <Typography {...typographyProps}>{coins}</Typography>
    </div>
  );
};

export default CoinsDisplay;
