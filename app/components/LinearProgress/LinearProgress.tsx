import styles from './LinearProgress.module.scss';

export interface LinearProgress {
  progress?: number;
}

const LinearProgress = ({ progress = 0 }: LinearProgress) => {
  return (
    <div className={styles.linearProgressBar}>
      <div style={{ width: `${Math.min(Math.max(0, progress), 100)}%` }} className={styles.linearProgressTrack} />
    </div>
  );
};

export default LinearProgress;
