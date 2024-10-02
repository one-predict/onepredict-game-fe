import { useState } from 'react';
import { Quest, QuestProgress } from '@api/QuestApi';
import AppSection from '@enums/AppSection';
import useGroupQuestsByStatus from '@hooks/useGroupQuestsByStatus';
import useMyReferralsQuery from '@hooks/queries/useMyReferralsQuery';
import useQuestsQuery from '@hooks/queries/useQuestsQuery';
import useVerifyQuestMutation from '@hooks/mutations/useVerifyQuestMutation';
import useClaimQuestRewardsMutation from '@hooks/mutations/useClaimQuestRewardsMutation';
import useStartQuestMutation from '@hooks/mutations/useStartQuestMutation';
import Typography from '@components/Typography';
import ButtonsToggle from '@components/ButtonsToggle';
import PageBody from '@components/PageBody';
import useSession from '@app/hooks/useSession';
import ReferralsTable from '@components/ReferralsTable';
import Loader from '@components/Loader';
import LabeledContent from '@components/LabeledContent';
import QuestsList from '@components/QuestsList';
import QuestDetailsPopup from '@components/QuestDetailsPopup';
import InviteFriendsCard from '@components/InviteFriendsCard';
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

  const [questToViewDetails, setQuestToViewDetails] = useState<Quest | null>(null);

  const currentUser = useSession();

  const { data: myReferrals } = useMyReferralsQuery();
  const { data: allQuests } = useQuestsQuery();

  const { completedQuests, availableQuests } = useGroupQuestsByStatus(allQuests);

  const { mutateAsync: verifyQuest, status: questVerificationStatus } = useVerifyQuestMutation();
  const { mutateAsync: claimQuestRewards, status: claimQuestRewardsStatus } = useClaimQuestRewardsMutation();
  const { mutateAsync: startQuest } = useStartQuestMutation();

  const showQuestViewDetailsPopup = (quest: Quest) => setQuestToViewDetails(quest);
  const hideQuestViewDetailsPopup = () => setQuestToViewDetails(null);

  const updateQuestToViewDetailsProgress = (questId: string, updatedQuestProgress: QuestProgress) => {
    setQuestToViewDetails((previousQuest) => {
      if (!previousQuest) {
        return null;
      }

      return previousQuest.id === questId ? { ...previousQuest, progressState: updatedQuestProgress } : previousQuest;
    });
  };

  const handleVerifyQuest = async (quest: Quest) => {
    const updatedQuestProgress = await verifyQuest(quest.id);

    updateQuestToViewDetailsProgress(quest.id, updatedQuestProgress);
  };

  const handleClaimQuestRewards = async (quest: Quest) => {
    await claimQuestRewards(quest.id);

    setQuestToViewDetails(null);
  };

  const handleStartQuest = async (quest: Quest) => {
    if (quest.progressState) {
      return;
    }

    const updatedQuestProgress = await startQuest(quest.id);

    updateQuestToViewDetailsProgress(quest.id, updatedQuestProgress);
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

  const renderTasksCategory = (category: string, quests: Quest[]) => {
    return (
      <div className={styles.tasksCategoryContainer}>
        <Typography color="secondary" variant="subtitle2">
          {category}
        </Typography>
        <QuestsList quests={quests} noQuestsMessage="No tasks here..." onViewQuest={showQuestViewDetailsPopup} />
      </div>
    );
  };

  const renderTasksSection = () => {
    if (!allQuests) {
      return <Loader centered />;
    }

    return (
      <div className={styles.tasksSection}>
        {renderTasksCategory('Available Tasks', availableQuests)}
        {renderTasksCategory('Completed', completedQuests)}
      </div>
    );
  };

  const renderReferralsSection = () => {
    return (
      <div className={styles.referralsSection}>
        <InviteFriendsCard currentUserId={currentUser?.id} />
        {myReferrals && (
          <LabeledContent className={styles.yourFriendsLabeledContent} row title="Your friends:">
            <Typography>{myReferrals?.length}</Typography>
          </LabeledContent>
        )}
        {renderReferralsCard()}
      </div>
    );
  };

  return (
    <PageBody>
      <Typography className={styles.pageTitle} uppercase alignment="center" variant="h1" color="gradient1">
        Complete tasks <br /> and get rewards!
      </Typography>
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
      {selectedCategory === 'tasks' ? renderTasksSection() : renderReferralsSection()}
      <QuestDetailsPopup
        isOpen={!!questToViewDetails}
        quest={questToViewDetails}
        onVerify={handleVerifyQuest}
        onClaimReward={handleClaimQuestRewards}
        onStart={handleStartQuest}
        onClose={hideQuestViewDetailsPopup}
        isVerificationInProgress={questVerificationStatus === 'pending'}
        isRewardClaimingInProgress={claimQuestRewardsStatus === 'pending'}
      />
    </PageBody>
  );
};

export default RewardsPage;
