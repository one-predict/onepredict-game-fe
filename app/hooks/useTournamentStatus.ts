import { useMemo } from 'react';
import dayjs from 'dayjs';
import { Tournament } from '@api/TournamentApi';
import { getDateFromUnixTimestamp } from '@app/utils/date';

export type TournamentStatus = 'upcoming' | 'registration' | 'live' | 'finished';

function useTournamentStatus(tournament: Tournament | null): TournamentStatus | null;
function useTournamentStatus(tournament: Tournament): TournamentStatus;
function useTournamentStatus(tournament: Tournament | null): TournamentStatus | null {
  return useMemo<TournamentStatus | null>(() => {
    if (!tournament) {
      return null;
    }

    const tournamentStartDate = getDateFromUnixTimestamp(tournament.startTimestamp);
    const tournamentEndDate = getDateFromUnixTimestamp(tournament.endTimestamp);
    const tournamentRegistrationEndDate = getDateFromUnixTimestamp(tournament.joinCloseTimestamp);

    if (dayjs().isAfter(tournamentEndDate)) {
      return 'finished';
    }

    if (dayjs().isBefore(tournamentStartDate)) {
      return 'upcoming';
    }

    if (dayjs().isBefore(tournamentRegistrationEndDate)) {
      return 'registration';
    }

    return 'live';
  }, [tournament]);
}

export default useTournamentStatus;
