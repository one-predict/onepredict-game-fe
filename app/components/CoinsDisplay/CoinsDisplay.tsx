import clsx from 'clsx';
import Typography, { TypographyProps } from '@components/Typography';
import OurTokenImage from '@components/OurTokenImage';
import styles from './CoinsDisplay.module.scss';

export interface CoinsDisplayProps extends TypographyProps {
  coins: number;
  postfix?: string;
  containerClassName?: string;
  tokenImageClassName?: string;
}

const CoinsDisplay = ({
  containerClassName,
  coins,
  postfix,
  tokenImageClassName,
  ...typographyProps
}: CoinsDisplayProps) => {
  return (
    <div className={clsx(styles.coinsDisplay, containerClassName)}>
      <OurTokenImage className={clsx(styles.tokenImage, tokenImageClassName)} />
      <Typography {...typographyProps}>
        {coins}
        {postfix ? ` ${postfix}` : ''}
      </Typography>
    </div>
  );
};

export default CoinsDisplay;
