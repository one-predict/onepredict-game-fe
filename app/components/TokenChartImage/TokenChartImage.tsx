import { ImgHTMLAttributes } from 'react';
import clsx from 'clsx';
import { tokensLogoConfigMapMap } from '@app/data/tokens';
import styles from './TokenChartImage.module.scss';

export interface TokenChartImageProps {
  points: number,
  className: string
}

const TokenChartImage = ({ points, className }: TokenChartImageProps) => {
  const getDirection = (points: number): "rising" | "falling" => {
    if (points >= 0) {
      return "rising"
    } else {
      return "falling"
    }
  }
  const image = `/images/charts/${getDirection(points)}.png`
  const tokenImageClassname = clsx(
    className,
  );

  return <img className={tokenImageClassname} src={image} alt={`${points} token`} />;
};

export default TokenChartImage;
