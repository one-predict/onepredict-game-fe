export const getTournamentRoundByTimestamp = (
  timestamp: number,
  tournamentStartTimestamp: number,
  roundDurationInSeconds: number,
) => {
  return Math.floor((timestamp - tournamentStartTimestamp) / roundDurationInSeconds);
};
