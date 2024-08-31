import React from 'react';
import clsx from 'clsx';
import styles from './Typography.module.scss';

export interface TypographyProps {
  className?: string;
  color?: 'primary' | 'secondary' | 'gradient1' | 'gradient2' | 'gray' | 'yellow';
  alignment?: 'left' | 'center' | 'right';
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
  children?: React.ReactNode;
}

const Typography = ({
  variant = 'body1',
  alignment = 'left',
  color = 'primary',
  children,
  className,
  ...restProps
}: TypographyProps) => {
  const typographyComposedClassName = clsx(
    styles[`variant-${variant}`],
    styles[`alignment-${alignment}`],
    styles[`color-${color}`],
    className,
  );

  return (
    <div className={typographyComposedClassName} {...restProps}>
      {children}
    </div>
  );
};

export default Typography;
