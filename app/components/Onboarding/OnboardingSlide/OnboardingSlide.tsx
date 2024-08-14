import clsx from 'clsx';
import Typography from '@components/Typography';
import styles from './OnboardingSlide.module.scss';

export interface OnboardingSlideData {
  title: string;
  description: string;
  image: {
    src: string;
    width: number;
    height: number;
  };
}

export interface OnboardingSlideProps {
  className?: string;
  slideData: OnboardingSlideData;
}

const OnboardingSlide = ({ className, slideData }: OnboardingSlideProps) => {
  return (
    <div className={clsx(styles.onboardSlide, className)}>
      <div className={styles.onboardingSlideImageContainer}>
        <img
          width={slideData.image.width}
          height={slideData.image.height}
          src={slideData.image.src}
          alt={slideData.title}
        />
      </div>
      <Typography className={styles.onboardingSlideTitle} color="primary" alignment="center" variant="h1">
        {slideData.title}
      </Typography>
      <Typography className={styles.onboardingSlideDescription} alignment="center" variant="body2">
        {slideData.description}
      </Typography>
    </div>
  );
};

export default OnboardingSlide;
