import { useEffect, useMemo, useState, ReactNode } from 'react';
import { getDateFromUnixTimestamp } from '@utils/date';

export interface TimeRemainingProps {
  unixTimestamp: number;
  children: (remainingDays: number, remainingHours: number, remainingMinutes: number) => ReactNode;
}

const TIME_UPDATE_INTERVAL = 1000 * 60; // 60 secs in ms

const TimeRemaining = ({ unixTimestamp, children }: TimeRemainingProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const date = useMemo(() => getDateFromUnixTimestamp(unixTimestamp), [unixTimestamp]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, TIME_UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const { remainingDays, remainingHours, remainingMinutes } = useMemo(() => {
    const timeDifference = date.getTime() - currentTime.getTime();
    const minutesLeft = Math.floor(timeDifference / 1000 / 60);
    const remainingDays = Math.floor(minutesLeft / 60 / 24);
    const remainingHours = Math.floor(minutesLeft / 60);
    const remainingMinutes = minutesLeft % 60;

    return { remainingDays, remainingHours, remainingMinutes };
  }, [currentTime, date]);

  return <>{children(remainingDays, remainingHours, remainingMinutes)}</>;
};

export default TimeRemaining;
