import { ReactNode } from 'react';
import { useNavigate, useMatches } from '@remix-run/react';
import clsx from 'clsx';
import AppSection from '@enums/AppSection';
import Typography from '@components/Typography';
import HomeIcon from '@assets/icons/home.svg?react';
import FolderIcon from '@assets/icons/folder.svg?react';
import TasksIcon from '@assets/icons/tasks.svg?react';
import CupIcon from '@assets/icons/cup.svg?react';
import styles from './MenuTabBar.module.scss';

interface MenuSection {
  title: string;
  icon: ReactNode;
  link: string;
  section: AppSection;
}

export interface MenuTabProps {
  className?: string;
}

const sections: MenuSection[] = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: '/',
    section: AppSection.Home,
  },
  {
    title: 'Portfolios',
    icon: <FolderIcon />,
    link: '/portfolios',
    section: AppSection.Portfolios,
  },
  {
    title: 'Tasks',
    icon: <TasksIcon />,
    link: '/tasks',
    section: AppSection.Tasks,
  },
  {
    title: 'Tournaments',
    icon: <CupIcon />,
    link: '/tournaments',
    section: AppSection.Tournaments,
  },
];

const MenuTabBar = ({ className }: MenuTabProps) => {
  const navigate = useNavigate();

  const matches = useMatches();
  const match = matches[matches.length - 1];

  return (
    <div className={clsx(styles.menuTabBar, className)}>
      {sections.map((item, index) => {
        return (
          <div
            key={item.title}
            className={clsx(styles.menuSection, {
              [styles.selectedMenuSection]: match.handle?.appSection === item.section,
            })}
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
