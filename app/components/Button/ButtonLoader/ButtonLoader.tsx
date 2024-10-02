import clsx from 'clsx';
import styles from './ButtonLoader.module.scss';

export interface ButtonLoaderProps {
  dark?: boolean;
  className?: string;
}

const ButtonLoader = ({ dark, className }: ButtonLoaderProps) => {
  return (
    <div className={clsx(styles.buttonLoader, dark && styles.darkButtonLoader, className)}>
      <div className={styles.leftButtonLoaderDot} />
      <div className={styles.middleButtonLoaderDot} />
      <div className={styles.rightButtonLoaderDot} />
    </div>
  );
};

export default ButtonLoader;
