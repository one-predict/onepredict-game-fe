import React from 'react';
import clsx from 'clsx';
import ButtonLoader from './ButtonLoader';
import styles from './Button.module.scss';

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
}

const Button = ({ children, disabled, className, onClick, loading }: ButtonProps) => {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) {
      return;
    }

    onClick?.(event);
  };

  return (
    <button
      className={clsx(
        styles.button,
        {
          [styles.loadingButton]: loading,
        },
        className,
      )}
      onClick={handleButtonClick}
      disabled={disabled}
    >
      {loading ? <ButtonLoader /> : children}
    </button>
  );
};

export default Button;
