import { useEffect, useMemo, useState, ReactNode } from 'react';
import { getDateFromUnixTimestamp } from '@utils/date';
import { formatWithLeadingZero } from '@utils/formatting';

export interface RemainingTime {
  remainingDays: number;
  remainingHours: number;
  remainingMinutes: number;
  remainingSeconds: number;
  displayRemainingDays: string;
  displayRemainingHours: string;
  displayRemainingMinutes: string;
  displayRemainingSeconds: string;
  absoluteRemainingSeconds: number;
}

export interface TimeRemainingProps {
  unixTimestamp: number;
  children: (remainingTime: RemainingTime) => ReactNode;
  updateInterval?: number;
}

const TIME_UPDATE_INTERVAL = 1000 * 60; // 60 secs in ms

const TimeRemaining = ({ updateInterval = TIME_UPDATE_INTERVAL, unixTimestamp, children }: TimeRemainingProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const date = useMemo(() => getDateFromUnixTimestamp(unixTimestamp), [unixTimestamp]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, updateInterval!);

    return () => clearInterval(intervalId);
  }, [updateInterval]);

  const { remainingDays, remainingHours, remainingMinutes, absoluteRemainingSeconds, remainingSeconds } =
    useMemo(() => {
      const timeDifference = Math.max(0, date.getTime() - currentTime.getTime());
      const minutesLeft = Math.floor(timeDifference / 1000 / 60);

      const remainingDays = Math.floor(minutesLeft / 60 / 24);
      const remainingHours = Math.floor((minutesLeft / 60) % 24);
      const remainingMinutes = minutesLeft % 60;
      const remainingSeconds = Math.floor(timeDifference / 1000) % 60;
      const absoluteRemainingSeconds = Math.floor(timeDifference / 1000);

      return {
        remainingDays: Math.max(0, remainingDays),
        remainingHours: Math.max(0, remainingHours),
        remainingMinutes: Math.max(0, remainingMinutes),
        remainingSeconds: Math.max(0, remainingSeconds),
        absoluteRemainingSeconds: Math.max(0, absoluteRemainingSeconds),
      };
    }, [currentTime, date]);

  return (
    <>
      {children({
        remainingDays,
        remainingHours,
        remainingMinutes,
        remainingSeconds,
        absoluteRemainingSeconds,
        displayRemainingDays: formatWithLeadingZero(remainingDays),
        displayRemainingHours: formatWithLeadingZero(remainingHours),
        displayRemainingMinutes: formatWithLeadingZero(remainingMinutes),
        displayRemainingSeconds: formatWithLeadingZero(remainingSeconds),
      })}
    </>
  );
};

export default TimeRemaining;
