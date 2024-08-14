import { CSSProperties } from 'react';
import ArrowIcon from '@assets/icons/left-arrow.svg?react';
import CheckmarkIcon from '@assets/icons/checkmark.svg?react';
import styles from './OnboardingNextButton.module.scss';

export interface OnboardingNextButtonProps {
  onClick: () => void;
  percentage: number;
}

const OnboardingNextButton = ({ onClick, percentage }: OnboardingNextButtonProps) => {
  return (
    <div
      style={{ '--next-button-gradient-percentage': Math.min(100, percentage) } as CSSProperties}
      onClick={onClick}
      className={styles.onboardingNextButton}
    >
      <div className={styles.innerContainer}>
        {percentage === 100 ? (
          <CheckmarkIcon className={styles.checkmarkIcon} />
        ) : (
          <ArrowIcon className={styles.arrowIcon} />
        )}
      </div>
      <div className={styles.gradientBorder} />
      <div className={styles.transparencyBorder} />
    </div>
  );
};

export default OnboardingNextButton;
