import { ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import useCacheForTransition from '@hooks/useCacheForTransition';
import Portal from '@components/Portal';
import styles from './Popup.module.scss';

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  height?: number;
  contentClassName?: string;
}

const DEFAULT_POPUP_HEIGHT = 85;

const Popup = ({ height = DEFAULT_POPUP_HEIGHT, children, isOpen, onClose, contentClassName }: PopupProps) => {
  const [cachedChildren, onTransitionEnd] = useCacheForTransition(isOpen ? children : null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <Portal>
      {isOpen && <div onClick={onClose} className={styles.backdrop}></div>}
      <div
        onTransitionEnd={onTransitionEnd}
        style={{ height: `${height}%` }}
        className={clsx(styles.popup, isOpen && styles.visiblePopup)}
      >
        <div onClick={onClose} className={styles.crossIcon}></div>
        <div className={clsx(styles.popupContent, contentClassName)}>{cachedChildren}</div>
      </div>
    </Portal>
  );
};

export default Popup;
