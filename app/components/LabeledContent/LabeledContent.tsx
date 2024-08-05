import { ReactNode } from 'react';
import Typography from '@components/Typography';
import styles from './LabeledContent.module.scss';

export interface LabeledContentProps {
  title: string;
  children?: ReactNode;
}

const LabeledContent = ({ children, title }: LabeledContentProps) => {
  return (
    <div className={styles.labeledContent}>
      <Typography className={styles.labeledContentTitle} variant="body2">
        {title}
      </Typography>
      {children}
    </div>
  );
};

export default LabeledContent;
