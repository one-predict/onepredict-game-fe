import clsx from 'clsx';
import styles from './Loader.module.scss';

export interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return <div className={clsx(styles.loader, className)} />;
};

export default Loader;
