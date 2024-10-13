import { ReactNode, useEffect } from 'react';
import clsx from 'clsx';
import useCacheForTransition from '@hooks/useCacheForTransition';
import Portal from '@components/Portal';
import styles from './Popup.module.scss';
import Typography from '@components/Typography';

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  height?: number;
  contentClassName?: string;
}

const DEFAULT_POPUP_HEIGHT = 85;

const Popup = ({ height = DEFAULT_POPUP_HEIGHT, title, children, isOpen, onClose, contentClassName }: PopupProps) => {
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
        {title && (
          <Typography className={styles.popupTitle} alignment="center" variant="h3">
            {title}
          </Typography>
        )}
        <div className={clsx(styles.popupContent, contentClassName)}>{cachedChildren}</div>
      </div>
    </Portal>
  );
};

export default Popup;
