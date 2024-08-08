import { ReactNode } from 'react';
import MenuTabBar from '@components/MenuTabBar';
import { PageLayout } from '@components/Layouts';
import PageHead from '@components/PageHead';
import styles from './PageLayoutWithMenu.module.scss';

interface PageLayoutWithMenuProps {
  children?: ReactNode;
}

const PageLayoutWithMenu = ({ children }: PageLayoutWithMenuProps) => {
  return (
    <PageLayout>
      <PageHead />
      <div className={styles.innerContainer}>{children}</div>
      <MenuTabBar />
    </PageLayout>
  );
};

export default PageLayoutWithMenu;
