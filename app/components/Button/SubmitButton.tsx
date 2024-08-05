import clsx from 'clsx';
import Button, { ButtonProps } from './Button';
import CheckedIcon from '@assets/icons/checked-circle.svg?react';
import styles from './SubmitButton.module.scss';

const SubmitButton = ({ className, children, ...restProps }: ButtonProps) => {
  return (
    <Button className={clsx(styles.submitButton, className)} {...restProps}>
      <CheckedIcon className={styles.checkedIcon} />
      {children}
    </Button>
  );
};

export default SubmitButton;
