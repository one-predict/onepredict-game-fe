import { useMemo } from 'react';
import Typography, { TypographyProps } from '@components/Typography';
import { getDifferenceInSeconds } from '@utils/date';

export interface TimeAgeProps extends TypographyProps {
  date: Date;
}

const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;

const TimeAge = ({ date, ...restProps }: TimeAgeProps) => {
  const differenceInSeconds = useMemo(() => {
    return getDifferenceInSeconds(new Date(), date);
  }, [date]);

  const renderTime = () => {
    if (differenceInSeconds < SECONDS_IN_MINUTE) {
      return `${differenceInSeconds} seconds ago`;
    }

    const minutes = Math.floor(differenceInSeconds / SECONDS_IN_MINUTE);

    if (minutes < MINUTES_IN_HOUR) {
      return `${minutes} minutes ago`;
    }

    const hours = Math.floor(minutes / MINUTES_IN_HOUR);

    return `${hours} hours ago`;
  };

  return <Typography {...restProps}>{renderTime()}</Typography>;
};

export default TimeAge;
