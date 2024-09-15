import clsx from 'clsx';
import Typography, { TypographyProps } from '@components/Typography';
import styles from './CoinsDisplay.module.scss';

export interface CoinsDisplayProps extends TypographyProps {
  coins: number;
  postfix?: string;
  containerClassName?: string;
}

const CoinsDisplay = ({ containerClassName, coins, postfix, ...typographyProps }: CoinsDisplayProps) => {
  return (
    <div className={clsx(styles.coinsDisplay, containerClassName)}>
      <img src="/images/token.png" alt="token-image" />
      <Typography {...typographyProps}>
        {coins}
        {postfix ? ` ${postfix}` : ''}
      </Typography>
    </div>
  );
};

export default CoinsDisplay;
