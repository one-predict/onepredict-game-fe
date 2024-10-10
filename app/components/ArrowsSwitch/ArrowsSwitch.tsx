import { useState } from 'react';
import clsx from 'clsx';
import ArrowsSwitchIcon from '@assets/icons/arrows-switch.svg?react';
import styles from './ArrowsSwitch.module.scss';

export interface ArrowsSwitchProps {
  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const ArrowsSwitch = ({ checked, onChange, className }: ArrowsSwitchProps) => {
  const [isTouched, setIsTouched] = useState(false);

  return (
    <ArrowsSwitchIcon
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => setIsTouched(false)}
      onClick={() => onChange?.(!checked)}
      className={clsx(isTouched && styles.touchedArrowsIcon, className)}
    />
  );
};

export default ArrowsSwitch;
