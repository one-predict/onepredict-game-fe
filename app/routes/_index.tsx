import Typography from '@components/Typography';
import LevelProgressBar from '@components/LevelProgressBar';
import styles from './home.module.scss';

const HomePage = () => {
  const renderNavigationButton = (title: string, name: string) => {
    return (
      <div className={styles[`${name}Button`]}>
        <div className={styles.navigationButtonBackdrop}>
          <Typography color="primary" variant="h1">
            {title}
          </Typography>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles.pageBody}>
        <div className={styles.progressSection}>
          <Typography variant="h1" color="primary">
            Your Progress
          </Typography>
          <LevelProgressBar size={140} />
        </div>
        <div className={styles.buttonsSection}>
          {renderNavigationButton('My Deck', 'myDeck')}
          {renderNavigationButton('Store', 'marketplace')}
        </div>
      </div>
    </>
  );
};

export default HomePage;
