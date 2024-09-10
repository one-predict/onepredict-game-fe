import { ImgHTMLAttributes } from 'react';
import clsx from 'clsx';
import { tokensLogoConfigMapMap } from '@app/data/tokens';
import styles from './TokenImage.module.scss';

export interface TokenImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  token: string;
}

const TokenImage = ({ token, className, ...restProps }: TokenImageProps) => {
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

export default TokenImage;
