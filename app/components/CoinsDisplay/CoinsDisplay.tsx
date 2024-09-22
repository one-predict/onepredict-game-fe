import clsx from 'clsx';
import Typography, { TypographyProps } from '@components/Typography';
import OurTokenImage from '@components/OurTokenImage';
import styles from './CoinsDisplay.module.scss';

export interface CoinsDisplayProps extends TypographyProps {
  coins: number;
  postfix?: string;
  containerClassName?: string;
}

const CoinsDisplay = ({ containerClassName, coins, postfix, ...typographyProps }: CoinsDisplayProps) => {
  return (
    <div className={clsx(styles.coinsDisplay, containerClassName)}>
      <OurTokenImage />
      <Typography {...typographyProps}>
        {coins}
        {postfix ? ` ${postfix}` : ''}
      </Typography>
    </div>
  );
};

export default CoinsDisplay;
