import { PageLayout } from '@components/Layouts';
import styles from './LoadingScreen.module.scss';
import Typography from '@components/Typography';
import ProgressLoader from '@components/ProgressLoader';

export interface LoadingScreenProps {
  progress: number;
}

const LoadingScreen = ({ progress }: LoadingScreenProps) => {
  return (
    <PageLayout>
      <div className={styles.overlay}>
        <img className={styles.logoImage} src="/images/big-logo.png" alt="Logo" />
        <Typography className={styles.loadingTypography} color="primary">
          Loading...
        </Typography>
        <ProgressLoader className={styles.loader} progress={progress} />
      </div>
    </PageLayout>
  );
};

export default LoadingScreen;
