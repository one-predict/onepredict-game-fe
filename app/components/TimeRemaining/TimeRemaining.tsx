import { useEffect, useMemo, useState, ReactNode } from 'react';
import { getDateFromUtcDay } from '@utils/date';

export interface TimeRemainingProps {
  day: number;
  children: (remainingHours: number, remainingMinutes: number) => ReactNode;
}

const TIME_UPDATE_INTERVAL = 1000 * 60; // 60 secs in ms

const TimeRemaining = ({ day, children }: TimeRemainingProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const date = useMemo(() => getDateFromUtcDay(day), [day]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, TIME_UPDATE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const { remainingHours, remainingMinutes } = useMemo(() => {
    const timeDifference = date.getTime() - currentTime.getTime();
    const minutesLeft = Math.floor(timeDifference / 1000 / 60);
    const remainingHours = Math.floor(minutesLeft / 60);
    const remainingMinutes = minutesLeft % 60;

    return { remainingHours, remainingMinutes };
  }, [currentTime, date]);

  return <>{children(remainingHours, remainingMinutes)}</>;
};

export default TimeRemaining;
