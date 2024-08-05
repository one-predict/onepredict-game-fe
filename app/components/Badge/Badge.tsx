import clsx from 'clsx';
import Typography from '@components/Typography';
import LabeledContent from '@components/LabeledContent';
import styles from './Badge.module.scss';

export interface BadgeItem {
  title: string;
  value: string;
  valueAlignment?: 'left' | 'right';
  imageSrc?: string;
}

export interface BadgeProps {
  className?: string;
  items: BadgeItem[];
}

const Badge = ({ className, items }: BadgeProps) => {
  return (
    <div className={clsx(styles.badge, className)}>
      {items.map((item, index) => {
        return (
          <div className={styles.badgeItem} key={index}>
            {item.imageSrc && <img className={styles.badgeItemImage} src={item.imageSrc} />}
            <LabeledContent title={item.title}>
              <Typography alignment={item.valueAlignment}>{item.value}</Typography>
            </LabeledContent>
          </div>
        );
      })}
    </div>
  );
};

export default Badge;
