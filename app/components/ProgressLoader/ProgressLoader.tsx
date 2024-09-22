import clsx from 'clsx';
import styles from './ProgressLoader.module.scss';

export interface ProgressLoaderProps {
  className?: string;
  progress: number;
}

const MAX_PROGRESS = 100;

const ProgressLoader = ({ progress, className }: ProgressLoaderProps) => {
  return (
    <div className={clsx(styles.loader, className)}>
      <div style={{ width: `${Math.min(progress, MAX_PROGRESS)}%` }} className={styles.progressBar} />
    </div>
  );
};

export default ProgressLoader;
