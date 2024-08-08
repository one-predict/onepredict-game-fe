import { ReactNode } from 'react';
import styles from './PageLayout.module.scss';

interface PageLayoutProps {
  children?: ReactNode;
  noBackgroundImage?: boolean;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return <div className={styles.pageLayout}>{children}</div>;
};

export default PageLayout;
