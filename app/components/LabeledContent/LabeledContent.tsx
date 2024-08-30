import { ReactNode } from 'react';
import clsx from 'clsx';
import Typography, { TypographyProps } from '@components/Typography';
import styles from './LabeledContent.module.scss';

export interface LabeledContentProps {
  className?: string;
  title: string;
  children?: ReactNode;
  row?: boolean;
  labelVariant?: TypographyProps['variant'];
}

const LabeledContent = ({ className, children, title, row, labelVariant = 'body2' }: LabeledContentProps) => {
  return (
    <div className={clsx(row ? styles.rowLabeledContent : styles.labeledContentTitle, className)}>
      <Typography className={styles.labeledContentTitle} variant={labelVariant}>
        {title}
      </Typography>
      {children}
    </div>
  );
};

export default LabeledContent;
