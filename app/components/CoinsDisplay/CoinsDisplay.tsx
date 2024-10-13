import clsx from 'clsx';
import Typography, { TypographyProps } from '@components/Typography';
import OurTokenImage from '@components/OurTokenImage';
import styles from './CoinsDisplay.module.scss';

export interface CoinsDisplayProps extends TypographyProps {
  coins: number;
  postfix?: string;
  containerClassName?: string;
  tokenImageClassName?: string;
  tokenImageSrc?: string;
  reversed?: boolean;
}

const CoinsDisplay = ({
  containerClassName,
  coins,
  postfix,
  tokenImageClassName,
  reversed,
  tokenImageSrc = '/images/token.png',
  ...typographyProps
}: CoinsDisplayProps) => {
  return (
    <div className={clsx(styles.coinsDisplay, reversed && styles.reversedCoinsDisplay, containerClassName)}>
      <OurTokenImage className={clsx(styles.tokenImage, tokenImageClassName)} />
      <Typography {...typographyProps}>
        {coins}
        {postfix ? ` ${postfix}` : ''}
      </Typography>
    </div>
  );
};

export default CoinsDisplay;
