import { useMemo } from 'react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import ClockIcon from '@assets/icons/clock.svg?react';
import Typography from '@components/Typography';
import styles from './DateRangeView.module.scss';

type DateRangeTime = 'past' | 'future' | 'present';

export interface DataRangeViewProps {
  className?: string;
  fromDate: Date;
  toDate: Date;
}

const DISPLAY_FORMAT = 'MMM D';

const DateRangeView = ({ fromDate, toDate, className }: DataRangeViewProps) => {
  const formattedFromDate = dayjs(fromDate).format(DISPLAY_FORMAT);
  const formattedToDate = dayjs(toDate).format(DISPLAY_FORMAT);

  const dateRangeTime: DateRangeTime = useMemo(() => {
    if (dayjs().isAfter(toDate)) {
      return 'past';
    }

    if (dayjs().isBefore(fromDate)) {
      return 'future';
    }

    return 'present';
  }, [fromDate, toDate]);

  const dateRangeViewComposedClassName = clsx(
    {
      [styles.futureDateRangeView]: dateRangeTime === 'future',
      [styles.pastDateRangeView]: dateRangeTime === 'past',
      [styles.presentDateRangeView]: dateRangeTime === 'present',
    },
    className,
  );

  return (
    <div className={dateRangeViewComposedClassName}>
      <ClockIcon className={styles.dateRangeViewClockIcon} />
      <Typography className={styles.dateRangeViewTitle} variant="h6">
        {formattedFromDate} - {formattedToDate}
      </Typography>
    </div>
  );
};

export default DateRangeView;
