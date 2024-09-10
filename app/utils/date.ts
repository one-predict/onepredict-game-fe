import dayjs from 'dayjs';

export const getDateFromUnixTimestamp = (timestamp: number) => {
  return dayjs.unix(timestamp).toDate();
};

export const getDifferenceInSeconds = (firstDate: Date, secondDate: Date) => {
  return dayjs(firstDate).diff(dayjs(secondDate), 'second');
};
