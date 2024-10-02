import React from 'react';
import clsx from 'clsx';
import ButtonLoader from './ButtonLoader';
import styles from './Button.module.scss';

export type ButtonSize = 'default' | 'large';

export interface ButtonProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading?: boolean;
  size?: ButtonSize;
  darkLoader?: boolean;
}

const Button = ({ children, disabled, darkLoader, className, onClick, loading, size }: ButtonProps) => {
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
        styles[`button-${size}`],
        className,
      )}
      onClick={handleButtonClick}
      disabled={disabled}
    >
      <span>{loading ? <ButtonLoader dark={darkLoader} /> : children}</span>
    </button>
  );
};

export default Button;
