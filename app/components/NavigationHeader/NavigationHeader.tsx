import { useCallback } from 'react';
import clsx from 'clsx';
import Typography from '@components/Typography';
import LeftArrowIcon from '@assets/icons/left-arrow.svg?react';
import styles from './NavigationHeader.module.scss';
import { useNavigate } from '@remix-run/react';

export interface NavigationHeaderProps {
  className?: string;
  title: string;
  backHref: string;
}

const NavigationHeader = ({ className, title, backHref }: NavigationHeaderProps) => {
  const navigate = useNavigate();

  const handleLeftArrowIconClick = useCallback(() => {
    navigate(backHref);
  }, [navigate, backHref]);

  return (
    <div className={clsx(styles.navigationHeader, className)}>
      <LeftArrowIcon className={styles.leftArrowIcon} onClick={handleLeftArrowIconClick} alt="left-arrow-icon" />
      <Typography variant="subtitle1">{title}</Typography>
    </div>
  );
};

export default NavigationHeader;
