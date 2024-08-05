import UserBadge from '@components/UserBadge';
import Typography from '@components/Typography';
import styles from './battles.module.scss';

export const handle = {
  pageTitle: 'Battles',
  backHref: '/',
};

const BattlesPage = () => {
  return (
    <>
      <UserBadge />
      <div className={styles.comingSoonSection}>
        <Typography variant="h1">Coming soon!</Typography>
      </div>
    </>
  );
};

export default BattlesPage;
