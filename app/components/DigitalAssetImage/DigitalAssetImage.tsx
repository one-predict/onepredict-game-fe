import { ImgHTMLAttributes } from 'react';
import clsx from 'clsx';
import { digitalAssetLogoConfigMap } from '@app/data/digital-assets';
import styles from './DigitalAssetImage.module.scss';

export interface DigitalAssetImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  assetId: string;
}

const DigitalAssetImage = ({ assetId, className, ...restProps }: DigitalAssetImageProps) => {
  const { image, backgroundColor } = digitalAssetLogoConfigMap[assetId];

  const assetImageClassname = clsx(
    {
      [styles.lightBackgroundAssetImage]: backgroundColor === 'light',
      [styles.darkBackgroundAssetImage]: backgroundColor === 'dark',
    },
    className,
  );

  return <img className={assetImageClassname} src={image} alt={`${assetId} digital asset`} {...restProps} />;
};

export default DigitalAssetImage;
