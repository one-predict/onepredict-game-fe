import { useMemo } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import ClockIcon from '@assets/icons/clock.svg?react';
import Typography from '@components/Typography';

type DateRangeTime = 'past' | 'future' | 'present';

export interface DataRangeViewProps {
  className?: string;
  fromDate: Date;
  toDate: Date;
}

const StyledDataRangeViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4px;
  align-items: center;
`;

const StyledTypography = styled(Typography)<{
  $dateRangeTime: DateRangeTime;
}>`
  color: ${({ $dateRangeTime }) => {
    if ($dateRangeTime === 'past') {
      return '#8C8498';
    }

    return `#F2F2F2`;
  }};
`;

const StyledClockIcon = styled(ClockIcon)<{ $dateRangeTime: DateRangeTime; }>`
  width: 15px;
  height: 15px;
  margin-bottom: 2px;
  fill: ${({ $dateRangeTime }) => {
    switch ($dateRangeTime) {
      case 'past':
        return '#8C8498';
      case 'future':
        return '#FFB800';
      case 'present': {
        return '#439CB5';
      }
    }
  }};
`;

const DISPLAY_FORMAT = 'MMM D';

const DateRangeView = ({ fromDate, toDate, className }: DataRangeViewProps) => {
  const formattedFromDate = dayjs(fromDate).format(DISPLAY_FORMAT);
  const formattedToDate = dayjs(toDate).format(DISPLAY_FORMAT);

  const dateRangeTime = useMemo(() => {
    if (dayjs().isAfter(toDate)) {
      return 'past';
    }

    if (dayjs().isBefore(fromDate)) {
      return 'future';
    }

    return 'present';
  }, [fromDate, toDate]);

  return (
    <StyledDataRangeViewContainer className={className}>
      <StyledClockIcon $dateRangeTime={dateRangeTime} />
      <StyledTypography $dateRangeTime={dateRangeTime} variant="h6">
        {formattedFromDate} - {formattedToDate}
      </StyledTypography>
    </StyledDataRangeViewContainer>
  );
};

export default DateRangeView;
