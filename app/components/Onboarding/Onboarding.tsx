import { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import OnboardingSlide from './OnboardingSlide';
import OnboardingNextButton from './OnboardingNextButton';
import Typography from '@components/Typography';
import slides from './slides';
import styles from './Onboarding.module.scss';

interface OnboardingProps {
  onBoardingComplete: () => void;
}

const Onboarding = ({ onBoardingComplete }: OnboardingProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({});

  useEffect(() => {
    const callback = () => {
      if (!emblaApi) {
        return;
      }

      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi?.on('select', callback);

    return () => {
      emblaApi?.off('select', callback);
    };
  }, [emblaApi]);

  const handleNextButtonClick = () => {
    if (!emblaApi) {
      return;
    }

    if (!emblaApi.canScrollNext()) {
      onBoardingComplete();
    } else {
      emblaApi.scrollNext();
    }
  };

  const percentage = ((currentIndex + 1) / slides.length) * 100;

  return (
    <div className={styles.onboarding}>
      <div className={styles.onboardingPanel}>
        <img className={styles.coinImage} src="/images/aipick-coin.png" alt="Aipick Logo" />
        <Typography variant="body2" color="primary" onClick={onBoardingComplete}>
          Skip
        </Typography>
      </div>
      <div ref={emblaRef} className={styles.sliderContainer}>
        <div className={styles.sliderInnerContainer}>
          {slides.map((item, index) => (
            <OnboardingSlide key={index} className={styles.slider} slideData={slides[index]} />
          ))}
        </div>
      </div>
      <div className={styles.onboardingNextButtonPanel}>
        <OnboardingNextButton percentage={percentage} onClick={handleNextButtonClick} />
      </div>
    </div>
  );
};

export default Onboarding;
