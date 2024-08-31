import clsx from 'clsx';
import { Tournament } from '@api/TournamentApi';
import useTournamentStatus from '@hooks/useTournamentStatus';
import TimeRemaining from '@components/TimeRemaining';
import Typography from '@components/Typography';
import styles from './TournamentAvailabilityInfo.module.scss';

export interface TournamentAvailabilityInfoProps {
  className?: string;
  tournament: Tournament;
}

const TournamentAvailabilityInfo = ({ className, tournament }: TournamentAvailabilityInfoProps) => {
  const tournamentStatus = useTournamentStatus(tournament);

  if (!tournamentStatus) {
    return null;
  }

  const statusBadgeClassName = clsx({
    [styles.upcomingStatusBadge]: tournamentStatus === 'upcoming',
    [styles.liveStatusBadge]: tournamentStatus === 'live',
    [styles.finishedStatusBadge]: tournamentStatus === 'finished',
  });

  return (
    <div className={clsx(styles.tournamentAvailabilityInfo, className)}>
      <div className={statusBadgeClassName}>{tournamentStatus}</div>
      {tournamentStatus !== 'finished' && (
        <TimeRemaining
          unixTimestamp={tournamentStatus === 'upcoming' ? tournament.startTimestamp : tournament.endTimestamp}
        >
          {({ remainingDays, remainingHours, remainingMinutes }) => {
            return (
              <Typography variant="h6">
                {tournamentStatus === 'upcoming'
                  ? `Starts in ${remainingDays}d ${remainingHours}h ${remainingMinutes}m`
                  : `Ends in ${remainingDays}d ${remainingHours}h ${remainingMinutes}m`}
              </Typography>
            );
          }}
        </TimeRemaining>
      )}
    </div>
  );
};

export default TournamentAvailabilityInfo;
