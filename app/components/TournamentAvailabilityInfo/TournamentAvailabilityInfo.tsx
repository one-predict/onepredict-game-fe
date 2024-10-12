import clsx from 'clsx';
import { Tournament } from '@api/TournamentApi';
import useTournamentStatus, { TournamentStatus } from '@hooks/useTournamentStatus';
import TimeRemaining from '@components/TimeRemaining';
import Typography from '@components/Typography';
import styles from './TournamentAvailabilityInfo.module.scss';

export interface TournamentAvailabilityInfoProps {
  className?: string;
  tournament: Tournament;
}

const TOURNAMENT_TIME_PREFIX_MAP = new Map<TournamentStatus, string>([
  ['upcoming', 'Starts In'],
  ['registration', 'Entry ends in'],
  ['live', 'Ends in'],
]);

const getTimeRemainingUnixTimestamp = (tournament: Tournament, tournamentStatus: TournamentStatus) => {
  switch (tournamentStatus) {
    case 'upcoming': {
      return tournament.startTimestamp;
    }
    case 'registration': {
      return tournament.joinCloseTimestamp;
    }
    case 'live': {
      return tournament.endTimestamp;
    }
    default: {
      return undefined;
    }
  }
};

const TournamentAvailabilityInfo = ({ className, tournament }: TournamentAvailabilityInfoProps) => {
  const tournamentStatus = useTournamentStatus(tournament);

  if (!tournamentStatus) {
    return null;
  }

  const statusBadgeClassName = clsx({
    [styles.upcomingStatusBadge]: tournamentStatus === 'upcoming',
    [styles.liveStatusBadge]: tournamentStatus === 'live',
    [styles.registrationStatusBadge]: tournamentStatus === 'registration',
    [styles.finishedStatusBadge]: tournamentStatus === 'finished',
  });

  const timeRemainingUnixTimestamp = getTimeRemainingUnixTimestamp(tournament, tournamentStatus);

  return (
    <div className={clsx(styles.tournamentAvailabilityInfo, className)}>
      <div className={statusBadgeClassName}>{tournamentStatus}</div>
      {timeRemainingUnixTimestamp !== undefined && (
        <TimeRemaining unixTimestamp={timeRemainingUnixTimestamp}>
          {({ remainingDays, remainingHours, remainingMinutes }) => {
            const timePrefix = TOURNAMENT_TIME_PREFIX_MAP.get(tournamentStatus);

            return (
              <Typography variant="h6">
                {timePrefix} {remainingDays}d {remainingHours}h {remainingMinutes}m
              </Typography>
            );
          }}
        </TimeRemaining>
      )}
    </div>
  );
};

export default TournamentAvailabilityInfo;
