import React from 'react';
import clsx from 'clsx';
import styles from './Typography.module.scss';

export type TypographyTag = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' | 'body1' | 'body2';
export type TypographyColor = 'primary' | 'secondary' | 'gradient1' | 'gradient2' | 'gray' | 'yellow';
export type TypographyAlignment = 'left' | 'center' | 'right';

export interface TypographyProps {
  className?: string;
  color?: TypographyColor;
  alignment?: TypographyAlignment;
  variant?: TypographyVariant;
  tag?: TypographyTag;
  children?: React.ReactNode;
}

const tagByVariant: Record<TypographyVariant, TypographyTag> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'p',
  subtitle2: 'p',
  body1: 'p',
  body2: 'p',
};

const Typography = ({
  variant = 'body1',
  alignment = 'left',
  color = 'primary',
  children,
  className,
  tag = tagByVariant[variant],
  ...restProps
}: TypographyProps) => {
  const typographyComposedClassName = clsx(
    styles[`variant-${variant}`],
    styles[`alignment-${alignment}`],
    styles[`color-${color}`],
    className,
  );

  const Tag = tag;

  return (
    <Tag className={typographyComposedClassName} {...restProps}>
      {children}
    </Tag>
  );
};

export default Typography;
