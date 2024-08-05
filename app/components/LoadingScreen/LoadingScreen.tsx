import { PageLayout } from '@components/Layouts';
import styles from './LoadingScreen.module.scss';

const LoadingScreen = () => {
  return (
    <PageLayout>
      <div className={styles.loader}>
        <div className={styles.firstWave} />
        <div className={styles.secondWave} />
        <div className={styles.thirdWave} />
        <div className={styles.fourthWave} />
        <img width={100} height={100} className={styles.logoImage} src="/images/big-logo.png" alt="Logo" />
      </div>
    </PageLayout>
  );
};

export default LoadingScreen;
