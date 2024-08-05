import { useMemo } from 'react';
import clsx from 'clsx';
import { Tournament } from '@api/TournamentApi';
import DateRangeView from '@components/DateRangeView';
import { getDateFromUtcDay } from '@app/utils/date';
import useTournamentStatus from '@hooks/useTournamentStatus';
import styles from './TournamentAvailabilityInfo.module.scss';

export interface TournamentAvailabilityInfoProps {
  className?: string;
  tournament: Tournament;
}

const TournamentAvailabilityInfo = ({ className, tournament }: TournamentAvailabilityInfoProps) => {
  const tournamentStartDate = useMemo(() => {
    return getDateFromUtcDay(tournament.startDay);
  }, [tournament.startDay]);

  const tournamentEndDate = useMemo(() => {
    return getDateFromUtcDay(tournament.endDay);
  }, [tournament.endDay]);

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
      <DateRangeView fromDate={tournamentStartDate} toDate={tournamentEndDate} />
    </div>
  );
};

export default TournamentAvailabilityInfo;
