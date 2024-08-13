import styles from './OnboardingItem.module.scss';
import { IOnboardingItem } from '../types';
import Typography from '@components/Typography';

export interface OnboardingItemProps {
  item: IOnboardingItem;
}

export const OnboardingItem = ({ item }: OnboardingItemProps) => {
  const { title, description, image } = item || {};

  return (
    <div className={styles.onboardingItem}>
      <div className={styles.onboardingItemImage}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.onboardingItemTitle}>
        <Typography color="primary" alignment="center" variant="h1">
          {title}
        </Typography>
      </div>
      <div className={styles.onboardingItemDescription}>
        <Typography alignment="center" variant="subtitle2">
          {description}
        </Typography>
      </div>
    </div>
  );
};
