import { QuestObjective } from '@types/QuestObjective';
import QuestObjectiveType from '@enums/QuestObjectiveType';
import JoinTournamentObjectiveActions from './JoinTournamentObjectiveActions';
import SubscribeSocialsObjectiveActions from './SubscribeSocialsObjectiveActions';
import FollowTelegramChannelObjectiveActions from './FollowTelegramChannelObjectiveActions';

export interface ObjectiveActionsProps {
  objective: QuestObjective;
  onQuestStart: () => void;
  onQuestVerify: () => void;
  isQuestVerificationInProgress?: boolean;
}

const ObjectiveActions = ({ objective, onQuestStart }: ObjectiveActionsProps) => {
  if (objective.type === QuestObjectiveType.JoinTournament) {
    return <JoinTournamentObjectiveActions tournamentId={objective.config.tournamentId} />;
  }

  if (objective.type === QuestObjectiveType.SubscribeSocials) {
    return <SubscribeSocialsObjectiveActions socialLink={objective.config.socialLink} onLinkClick={onQuestStart} />;
  }

  if (objective.type === QuestObjectiveType.FollowTelegramChannel) {
    return (
      <FollowTelegramChannelObjectiveActions channelId={objective.config.channelId} onFollowLinkClick={onQuestStart} />
    );
  }

  return null;
};

export default ObjectiveActions;
