import clsx from 'clsx';
import styles from './ButtonLoader.module.scss';

export interface ButtonLoaderProps {
  className?: string;
}

const ButtonLoader = ({ className }: ButtonLoaderProps) => {
  return (
    <div className={clsx(styles.buttonLoader, className)}>
      <div className={styles.leftButtonLoaderDot} />
      <div className={styles.middleButtonLoaderDot} />
      <div className={styles.rightButtonLoaderDot} />
    </div>
  );
};

export default ButtonLoader;
