import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './PageBody.module.scss';

export interface PageBodyProps {
  className?: string;
  children: ReactNode;
}

const PageBody = ({ className, children }: PageBodyProps) => {
  return <div className={clsx(styles.pageBody, className)}>{children}</div>;
};

export default PageBody;
