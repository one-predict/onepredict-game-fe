import Typography, { TypographyProps } from '@components/Typography';
import styles from './AipickCoins.module.scss';

export interface AipickCoinsProps extends TypographyProps {
  coins: number;
}

const AipickCoins = ({ coins, ...typographyProps }: AipickCoinsProps) => {
  return (
    <div className={styles.priceSection}>
      <img src="/images/mini-aipick-coin.png" alt="mini-aipick-coin" />
      <Typography {...typographyProps}>{coins}</Typography>
    </div>
  );
};

export default AipickCoins;
