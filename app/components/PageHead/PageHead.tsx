import clsx from 'clsx';
import useSession from '@hooks/useSession';
import Typography from '@components/Typography';
import LevelProgressBar from '@components/LevelProgressBar';
import AipickCoins from '@components/AipickCoins';
import styles from './PageHead.module.scss';

export interface PageHeadProps {
  className?: string;
}

const PageHeader = ({ className }: PageHeadProps) => {
  const currentUser = useSession();

  const userFullName = [currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(' ');

  return (
    <div className={clsx(styles.pageHead, className)}>
      <div className={styles.userDetails}>
        <Typography variant="h6">{userFullName || currentUser?.username || 'Anonymous'}</Typography>
        <LevelProgressBar />
      </div>
      <AipickCoins coins={currentUser?.coinsBalance || 0} />
    </div>
  );
};

export default PageHeader;
