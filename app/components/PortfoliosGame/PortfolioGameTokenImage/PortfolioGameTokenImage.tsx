import { ImgHTMLAttributes } from 'react';
import clsx from 'clsx';
import { tokensLogoConfigMapMap } from '@app/data/tokens';
import styles from './PortfolioGameTokenImage.module.scss';

export interface PortfolioGameTokenImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  token: string;
}

const PortfolioGameTokenImage = ({ token, className, ...restProps }: PortfolioGameTokenImageProps) => {
  const { image, backgroundColor } = tokensLogoConfigMapMap[token];

  const tokenImageClassname = clsx(
    {
      [styles.lightBackgroundTokenImage]: backgroundColor === 'light',
      [styles.darkBackgroundTokenImage]: backgroundColor === 'dark',
    },
    className,
  );

  return <img className={tokenImageClassname} src={image} alt={`${token} token`} {...restProps} />;
};

export default PortfolioGameTokenImage;
