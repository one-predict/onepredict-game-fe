import { ReactNode } from 'react';
import clsx from 'clsx';
import Typography from '@components/Typography';
import styles from './HomeMenuSection.module.scss';

export interface HomeMenuSectionProps {
  title: string;
  description: string;
  actionButtonTitle: string;
  image: string;
  onActionButtonClick?: () => void;
  imageClassName?: string;
  menuSectionFooter?: ReactNode;
}

const HomeMenuSection = ({
  title,
  description,
  actionButtonTitle,
  menuSectionFooter,
  image,
  imageClassName,
  onActionButtonClick,
}: HomeMenuSectionProps) => {
  return (
    <div className={styles.menuSection}>
      <div className={styles.menuSectionHeader}>
        <Typography color="gradient1" variant="h2">
          {title}
        </Typography>
        <Typography color="primary" variant="body2">
          {description}
        </Typography>
      </div>
      <img alt={`${title}-image`} className={clsx(styles.menuSectionImage, imageClassName)} src={image} />
      <div onClick={onActionButtonClick} className={styles.menuSectionActionButton}>
        <Typography variant="h4">{actionButtonTitle}</Typography>
      </div>
      {menuSectionFooter && <div className={styles.menuSectionFooter}>{menuSectionFooter}</div>}
    </div>
  );
};

export default HomeMenuSection;
