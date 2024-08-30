import { ReactNode } from 'react';
import MenuTabBar from '@components/MenuTabBar';
import { PageLayout, PageLayoutBackground } from '@components/Layouts';
import PageHead from '@components/PageHead';
import styles from './PageLayoutWithMenu.module.scss';

interface PageLayoutWithMenuProps {
  children?: ReactNode;
  background?: PageLayoutBackground;
}

const PageLayoutWithMenu = ({ children, background }: PageLayoutWithMenuProps) => {
  return (
    <PageLayout background={background}>
      <PageHead />
      <div className={styles.innerContainer}>{children}</div>
      <MenuTabBar className={styles.menuTableBar} />
    </PageLayout>
  );
};

export default PageLayoutWithMenu;
