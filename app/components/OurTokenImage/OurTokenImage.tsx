import { ImgHTMLAttributes } from 'react';

export type OurTokenImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;

const OurTokenImage = ({ ...imageProps }: OurTokenImageProps) => {
  return <img src="/images/token.png" {...imageProps} alt="token-image" />;
};

export default OurTokenImage;
