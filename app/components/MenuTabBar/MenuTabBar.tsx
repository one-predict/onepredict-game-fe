import { ReactNode } from 'react';
import { useLocation, useNavigate, matchPath } from '@remix-run/react';
import clsx from 'clsx';
import Typography from '@components/Typography';
import HomeIcon from '@assets/icons/home.svg?react';
import FolderIcon from '@assets/icons/folder.svg?react';
import VsIcon from '@assets/icons/vs.svg?react';
import CupIcon from '@assets/icons/cup.svg?react';
import styles from './MenuTabBar.module.scss';

interface MenuSection {
  title: string;
  icon: ReactNode;
  path: string;
  link: string;
  exact?: boolean;
}

export interface MenuTabProps {
  className?: string;
}

const sections: MenuSection[] = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    path: '/',
    link: '/',
    exact: true,
  },
  {
    title: 'Portfolios',
    icon: <FolderIcon />,
    link: '/portfolios',
    path: '/portfolios/*',
  },
  {
    title: 'PvP',
    icon: <VsIcon />,
    link: '/battles',
    path: '/battles/*',
  },
  {
    title: 'Tournaments',
    icon: <CupIcon />,
    link: '/tournaments',
    path: '/tournaments/*',
  },
];

const MenuTabBar = ({ className }: MenuTabProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={clsx(styles.menuTabBar, className)}>
      {sections.map((item, index) => {
        const match = matchPath(
          {
            path: item.path,
            end: item.exact,
          },
          location.pathname,
        );

        return (
          <div
            key={item.title}
            className={clsx(styles.menuSection, { [styles.selectedMenuSection]: !!match })}
            onClick={() => navigate(item.link)}
          >
            {item.icon}
            <Typography className={styles.menuSectionTitle} variant="body2" key={index}>
              {item.title}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};

export default MenuTabBar;
