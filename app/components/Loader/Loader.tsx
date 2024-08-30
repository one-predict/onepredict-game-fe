import clsx from 'clsx';
import styles from './Loader.module.scss';

export interface LoaderProps {
  className?: string;
  centered?: boolean;
}

const Loader = ({ className, centered }: LoaderProps) => {
  return <div className={clsx(styles.loader, centered && styles.centeredLoader, className)} />;
};

export default Loader;
