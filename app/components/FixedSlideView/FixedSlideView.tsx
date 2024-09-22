import { ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import Portal from '@components/Portal';
import useCacheForTransition from '@hooks/useCacheForTransition';
import styles from './FixedSlideView.module.scss';

export interface FixedSlideProps {
  visible: boolean;
  children: ReactNode;
  height?: number;
  fullScreen?: boolean;
}

const FixedSlideView = ({ children, fullScreen, visible }: FixedSlideProps) => {
  const [cachedChildren, onTransitionEnd] = useCacheForTransition(visible ? children : null);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [visible]);

  return (
    <Portal>
      <div
        onTransitionEnd={onTransitionEnd}
        className={clsx(styles.fixedSlideView, {
          [styles.fullScreenFixedSlideView]: fullScreen,
          [styles.visibleFixedSlideView]: visible,
        })}
      >
        {cachedChildren}
      </div>
    </Portal>
  );
};

export default FixedSlideView;
