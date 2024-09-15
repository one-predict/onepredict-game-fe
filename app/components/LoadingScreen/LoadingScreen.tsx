import { PageLayout } from '@components/Layouts';
import styles from './LoadingScreen.module.scss';
import Typography from '@components/Typography';

const LoadingScreen = () => {
  return (
    <PageLayout>
      <div className={styles.overlay}>
        <img className={styles.logoImage} src="/images/big-logo.png" alt="Logo" />
        <div className={styles.loader} />
        <Typography className={styles.loadingTypography} color="primary">
          Loading...
        </Typography>
      </div>
    </PageLayout>
  );
};

export default LoadingScreen;
