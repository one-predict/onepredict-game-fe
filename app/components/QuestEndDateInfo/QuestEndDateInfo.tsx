import { getUnixTimestampFromDate } from '@utils/date';
import TimeRemaining from '@components/TimeRemaining';
import Typography, { TypographyProps } from '@components/Typography';

export interface QuestEndDateInfoProps extends Omit<TypographyProps, 'children'> {
  questEndDate: Date | string;
}

const QuestEndDateInfo = ({ questEndDate, ...typographyProps }: QuestEndDateInfoProps) => {
  return (
    <TimeRemaining unixTimestamp={getUnixTimestampFromDate(new Date(questEndDate))}>
      {({ displayRemainingDays, displayRemainingHours, displayRemainingMinutes }) => {
        return (
          <Typography {...typographyProps}>
            {displayRemainingDays}d {displayRemainingHours}h {displayRemainingMinutes}m
          </Typography>
        );
      }}
    </TimeRemaining>
  );
};

export default QuestEndDateInfo;
