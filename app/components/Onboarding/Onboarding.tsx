import styles from './Onboarding.module.scss';
import { OnboardingItem } from './OnboardingItem';
import { IOnboardingItem } from './types';
import { useState } from 'react';
import { useNavigate } from '@remix-run/react';
import { NextButton } from './NextButton';

interface OnboardingProps {
  items: IOnboardingItem[];
}

export const Onboarding = ({ items }: OnboardingProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const completeOnboarding = () => {
    navigate('/');
  };

  const isLastItem = currentIndex === items.length - 1;
  const percentage = ((currentIndex + 1) / items.length) * 100;

  return (
    <div className={styles.onboarding}>
      <div className={styles.onboardingPanel}>
        <img className={styles.onboardingLogo} src="/images/aipick-coin.png" alt="Aipick Logo" />
        <a className={styles.onboardingSkip} onClick={completeOnboarding}>
          Skip
        </a>
      </div>
      <div className={styles.onboardingItem}>
        <OnboardingItem item={items[currentIndex]} />
      </div>
      <div className={styles.onboardingNext}>
        {isLastItem ? (
          <NextButton percentage={percentage} onClick={completeOnboarding} />
        ) : (
          <NextButton percentage={percentage} onClick={handleNext} />
        )}
      </div>
    </div>
  );
};
