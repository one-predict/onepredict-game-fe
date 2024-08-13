import { useNavigate } from '@remix-run/react';
import AppSection from '@enums/AppSection';
import Typography from '@components/Typography';
import LevelProgressBar from '@components/LevelProgressBar';
import PageBody from '@components/PageBody';
import styles from './home.module.scss';

export const handle = {
  appSection: AppSection.Home,
};

const HomePage = () => {
  const navigate = useNavigate();

  const renderNavigationButton = (title: string, name: string, link: string) => {
    return (
      <div onClick={() => navigate(link)} className={styles[`${name}Button`]}>
        <div className={styles.navigationButtonBackdrop}>
          <Typography color="primary" variant="h1">
            {title}
          </Typography>
        </div>
      </div>
    );
  };

  return (
    <PageBody className={styles.pageBody}>
      <div className={styles.progressSection}>
        <Typography variant="h1" color="primary">
          Your Progress
        </Typography>
        <LevelProgressBar size={140} />
      </div>
      <div className={styles.buttonsSection}>
        {renderNavigationButton('My Deck', 'myDeck', '/my-deck')}
        {renderNavigationButton('Store', 'marketplace', '/store')}
      </div>
    </PageBody>
  );
};

export default HomePage;
