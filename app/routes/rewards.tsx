import { useState } from 'react';
import _ from 'lodash';
import AppSection from '@enums/AppSection';
import Typography from '@components/Typography';
import ButtonsToggle from '@components/ButtonsToggle';
import PageBody from '@components/PageBody';
import styles from './rewards.module.scss';
import Button from '@app/components/Button';
import useCurrentUserReferalsQuery from '@app/hooks/queries/useCurrentUserReferalsQuery';
import useSession from '@app/hooks/useSession';
import { getReferalLink } from '@app/utils/telegram';

type RewardsCategory = 'tasks' | 'referrals';
type FriendData = {
  id: string,
  username: string | undefined,
  points: string | number,
  invited: number
}

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
  const { data: currentUserReferals } = useCurrentUserReferalsQuery();

  const friendsData = currentUserReferals
    ? currentUserReferals.map(referal => {
      return {
        id: referal.id,
        username: referal.username,
        points: "coming soon",
        invited: referal.referalsCount
      }
    })
    : []
  const friendsList = friendsData.map((friend: FriendData) => {
    return <li key={friend.id} className={styles.listRow}>
      <Typography variant="h6" color="gray" className={styles.username}>{friend.username}</Typography>
      <Typography variant="h6" color="primary" className={styles.points}>{friend.points}</Typography>
      <Typography variant="h6" color="gray" className={styles.invited}>{friend.invited}</Typography>
    </li>
  }
  )

  const inviteFriend = () => {
    const botName = import.meta.env.VITE_BOT_NAME
    const appName = import.meta.env.VITE_APP_NAME
    const link = getReferalLink(currentUser?.id, botName, appName)
    navigator.clipboard.writeText(link)
  }

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
      {selectedCategory === "tasks"
        ? <div className={styles.comingSoonSection}>
          <Typography variant="h2">{_.capitalize(selectedCategory)} are coming soon!</Typography>
        </div>
        : <div className={styles.referalsContainer}>

          <div className={styles.referalsCard}>
            <Typography variant="h1" color="gradient1">Invite Friends</Typography>
            <div className={styles.referalsCardDescription}>
              <Typography variant="subtitle2" color="gray">Get <span className={styles.greenText}>10%</span> from your friends <span className={styles.greenText}>+ 2.5%</span> from their referrals.</Typography>
              <Typography variant="subtitle2" color="gray">Get <span className={styles.greenText}>1 card</span> as a gift for each friend.</Typography>
            </div>
            <div className={styles.referalsCardButtonContainer}>
              <Button disabled={!currentUser} className={styles.referalsCardButton} onClick={inviteFriend}>Copy referal link to clipboard</Button>
            </div>
          </div>

          <div className={styles.friendsContainer}>
            <div className={styles.friendsTitle}>
              <Typography variant="h6" color="secondary">Your friends: <span className={styles.whiteText}>{friendsData.length}</span></Typography>
            </div>
            <div className={styles.friendsList}>
              <div className={styles.listHeaders}>
                <Typography variant="h6" color="secondary" className={styles.username}>Username</Typography>
                <Typography variant="h6" color="secondary" className={styles.points}>Points</Typography>
                <Typography variant="h6" color="secondary" className={styles.invited}>Invited</Typography>
              </div>
              <div className={styles.rowsContainer}>
                {friendsList}
              </div>
            </div>
          </div>
        </div>
      }

    </PageBody>
  );
};

export default RewardsPage;
