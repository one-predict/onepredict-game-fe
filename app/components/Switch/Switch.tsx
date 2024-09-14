import { ChangeEvent } from 'react';
import clsx from 'clsx';
import styles from './Switch.module.scss';
import Typography from '@components/Typography';

export interface SwitchProps {
  label?: string;
  className?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Switch = ({ checked, label, className, onChange }: SwitchProps) => {
  return (
    <label className={clsx(styles.switch, className)}>
      <input checked={checked} onChange={onChange} type="checkbox" />
      <span className={styles.slider} />
      {label && (
        <Typography color={checked ? 'primary' : 'gray'} tag="span" variant="subtitle1" className={styles.label}>
          {label}
        </Typography>
      )}
    </label>
  );
};

export default Switch;
