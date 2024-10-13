import { ImgHTMLAttributes } from 'react';

export type OurTokenImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;

const OurTokenImage = ({ ...imageProps }) => {
  return <img {...imageProps} alt="token-image" />;
};

export default OurTokenImage;
