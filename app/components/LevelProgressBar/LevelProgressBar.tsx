import Typography from '@components/Typography';
import LabeledContent from '@components/LabeledContent';
import styles from './LevelProgressBar.module.scss';

const LevelProgressBar = () => {
  return (
    <div className={styles.levelProgressBar}>
      <LabeledContent className={styles.levelLabel} labelVariant="subtitle2" row title="Level">
        <Typography variant="h6" color="primary">
          1
        </Typography>
      </LabeledContent>
    </div>
  );
};

export default LevelProgressBar;
