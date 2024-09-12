import { useState } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useUtils as useTelegramUtils } from '@telegram-apps/sdk-react';
import AppSection from '@enums/AppSection';
import useMyReferrals from '@hooks/queries/useMyReferrals';
import Typography from '@components/Typography';
import ButtonsToggle from '@components/ButtonsToggle';
import PageBody from '@components/PageBody';
import Button from '@app/components/Button';
import useSession from '@app/hooks/useSession';
import ReferralsTable from '@components/ReferralsTable';
import Loader from '@components/Loader';
import LabeledContent from '@components/LabeledContent';
import CopyIcon from '@assets/icons/copy.svg?react';
import { generateReferralLink, generateShareLink } from '@app/utils/telegram';
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
  const currentUser = useSession();

  const { data: myReferrals } = useMyReferrals();

  const telegramUtils = useTelegramUtils(true);

  const handleCopyButtonClick = () => {
    if (!currentUser) {
      return;
    }

    navigator.clipboard.writeText(generateReferralLink(currentUser.id));

    toast('Link copied!');
  };

  const handleInviteButtonClick = () => {
    if (!currentUser) {
      return;
    }

    telegramUtils.openTelegramLink(generateShareLink(currentUser.id));
  };

  const renderReferralsCard = () => {
    if (!myReferrals) {
      return <Loader className={styles.myReferralsLoader} centered />;
    }

    return (
      <div className={styles.referralsCard}>
        {myReferrals.length ? (
          <ReferralsTable referrals={myReferrals || []} />
        ) : (
          <Typography variant="h5" alignment="center">
            You don't have any referrals yet.
          </Typography>
        )}
      </div>
    );
  };

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
      {selectedCategory === 'tasks' ? (
        <div className={styles.comingSoonSection}>
          <Typography variant="h2">{_.capitalize(selectedCategory)} are coming soon!</Typography>
        </div>
      ) : (
        <div className={styles.referralsSection}>
          <div className={styles.inviteFriendsCard}>
            <Typography variant="h1" color="gradient1">
              Invite Friends
            </Typography>
            <Typography variant="subtitle2" color="gray">
              Your friend and you will get{' '}
              <Typography variant="subtitle2" tag="span" color="green">
                500 AIP
              </Typography>
              .
            </Typography>
            <Typography variant="subtitle2" color="gray">
              Get{' '}
              <Typography variant="subtitle2" tag="span" color="green">
                10%
              </Typography>{' '}
              from your friends coins income.
            </Typography>
            <div className={styles.inviteFriendsButtonsContainer}>
              <Button onClick={handleInviteButtonClick} disabled={!currentUser}>
                Invite Friend
              </Button>
              <Button onClick={handleCopyButtonClick} className={styles.copyButton}>
                <CopyIcon />
              </Button>
            </div>
          </div>
          {myReferrals && (
            <LabeledContent className={styles.yourFriendsLabeledContent} row title="Your friends:">
              <Typography>{myReferrals?.length}</Typography>
            </LabeledContent>
          )}
          {renderReferralsCard()}
        </div>
      )}
    </PageBody>
  );
};

export default RewardsPage;
