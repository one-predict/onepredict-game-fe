import { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './PageLayout.module.scss';

export interface PageLayoutBackground {
  image: string;
  position: CSSProperties['backgroundPosition'];
  overlay: boolean;
}

interface PageLayoutProps {
  children?: ReactNode;
  background?: PageLayoutBackground;
}

const DEFAULT_BACKGROUND_IMAGE = '/images/background.png';

const PageLayout = ({ children, background }: PageLayoutProps) => {
  return (
    <div
      style={{
        backgroundImage: `url(${background?.image || DEFAULT_BACKGROUND_IMAGE})`,
        backgroundPosition: background?.position || 'center',
      }}
      className={clsx(styles.pageLayout, background?.overlay && styles.pageLayoutWithOverlay)}
    >
      {children}
    </div>
  );
};

export default PageLayout;
