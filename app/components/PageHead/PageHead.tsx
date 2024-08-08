import clsx from 'clsx';
import useSession from '@hooks/useSession';
import LabeledContent from '@components/LabeledContent';
import Typography from '@components/Typography';
import styles from './PageHead.module.scss';

export interface PageHeadProps {
  className?: string;
}

const PageHeader = ({ className }: PageHeadProps) => {
  const currentUser = useSession();

  const userFullName = [currentUser?.firstName, currentUser?.lastName].filter(Boolean).join(' ');

  const items: Array<{ title: string; value: string; valueAlignment: 'left' | 'right' }> = [
    {
      title: 'User',
      value: userFullName || currentUser?.username || 'Anonymous',
      valueAlignment: 'left',
    },
    {
      title: 'Balance',
      value: `${currentUser?.coinsBalance} AIP`,
      valueAlignment: 'right',
    },
    {
      value: '1',
      title: 'Level',
      valueAlignment: 'right',
    },
  ];

  return (
    <div className={clsx(styles.pageHead, className)}>
      {items.map((item, index) => {
        return (
          <div className={styles.headItem} key={index}>
            <LabeledContent title={item.title}>
              <Typography alignment={item.valueAlignment}>{item.value}</Typography>
            </LabeledContent>
          </div>
        );
      })}
    </div>
  );
};

export default PageHeader;
