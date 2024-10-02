import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './GradientBorderContainer.module.scss';

export interface GradientBorderContainerProps {
  borderWrapperClassName?: string;
  innerContainerClassName?: string;
  onClick?: () => void;
  children: ReactNode;
}

const GradientBorderContainer = ({
  children,
  borderWrapperClassName,
  innerContainerClassName,
  onClick,
}: GradientBorderContainerProps) => {
  return (
    <div onClick={onClick} className={clsx(styles.gradientBorderContainer, borderWrapperClassName)}>
      <div className={clsx(styles.gradientBorderInnerContainer, innerContainerClassName)}>{children}</div>
    </div>
  );
};

export default GradientBorderContainer;
