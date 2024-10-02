import { useNavigate } from '@remix-run/react';
import Button from '@components/Button';

export interface JoinTournamentActionsProps {
  tournamentId?: string;
  onNavigateToTournament?: () => void;
}

const SubscribeSocialsActions = ({ tournamentId, onNavigateToTournament }: JoinTournamentActionsProps) => {
  const navigate = useNavigate();

  const handleJoinTournamentButtonClick = () => {
    navigate(tournamentId ? `/tournaments/${tournamentId}` : '/tournaments');

    onNavigateToTournament?.();
  };

  return (
    <Button size="large" onClick={handleJoinTournamentButtonClick}>
      Join Tournament
    </Button>
  );
};

export default SubscribeSocialsActions;
