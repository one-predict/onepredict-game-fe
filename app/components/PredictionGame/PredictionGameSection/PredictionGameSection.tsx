import { ReactNode } from 'react';
import clsx from 'clsx';
import GradientBorderContainer from '@components/GradientBorderContainer';
import styles from './PredictionGameSection.module.scss';

export interface PredictionGameSectionProps {
  children: ReactNode;
  innerContainerClassName?: string;
}

const PredictionGameSection = ({ children, innerContainerClassName }: PredictionGameSectionProps) => {
  return (
    <GradientBorderContainer
      borderWrapperClassName={styles.predictionGameSectionBorderWrapper}
      innerContainerClassName={clsx(styles.predictionGameSectionInnerContainer, innerContainerClassName)}
    >
      {children}
    </GradientBorderContainer>
  );
};

export default PredictionGameSection;
