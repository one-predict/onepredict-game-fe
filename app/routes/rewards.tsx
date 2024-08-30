import { useState } from 'react';
import _ from 'lodash';
import AppSection from '@enums/AppSection';
import Typography from '@components/Typography';
import ButtonsToggle from '@components/ButtonsToggle';
import PageBody from '@components/PageBody';
import styles from './rewards.module.scss';

type RewardsCategory = 'tasks' | 'referrals';

export const handle = {
  appSection: AppSection.Rewards,
  background: {
    image: '/images/rewards-page-background.png',
    overlay: true,
  },
};

const RewardsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<RewardsCategory>('tasks');

  return (
    <PageBody>
      <ButtonsToggle
        onSwitch={(category) => setSelectedCategory(category as RewardsCategory)}
        toggles={[
          {
            title: 'Tasks',
            id: 'tasks',
          },
          {
            title: 'Referrals',
            id: 'referrals',
          },
        ]}
        selectedId={selectedCategory}
      />
      <div className={styles.comingSoonSection}>
        <Typography variant="h2">{_.capitalize(selectedCategory)} are coming soon!</Typography>
      </div>
    </PageBody>
  );
};

export default RewardsPage;
