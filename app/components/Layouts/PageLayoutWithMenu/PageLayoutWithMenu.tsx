import { ReactNode } from 'react';
import MenuTabBar from '@components/MenuTabBar';
import NavigationHeader from '@components/NavigationHeader';
import { PageLayout } from '@components/Layouts';
import styles from './PageLayoutWithMenu.module.scss';

interface PageLayoutWithMenuProps {
  pageTitle?: string;
  backHref?: string;
  children?: ReactNode;
}

const PageLayoutWithMenu = ({ children, pageTitle, backHref }: PageLayoutWithMenuProps) => {
  return (
    <PageLayout>
      <div className={styles.innerContainer}>
        {pageTitle && backHref && (
          <NavigationHeader className={styles.navigationHeader} title={pageTitle} backHref={backHref} />
        )}
        {children}
      </div>
      <MenuTabBar />
    </PageLayout>
  );
};

export default PageLayoutWithMenu;
