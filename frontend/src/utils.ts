import { format, parseISO, fromUnixTime } from 'date-fns';

export const formatDate = (date: string | number): string => {
  if (typeof date === 'string') {
    return format(parseISO(date), 'PPP');
  }
  
  // Convert to milliseconds if in seconds
  const timestamp = date.toString().length === 10 ? date * 1000 : date;
  return format(fromUnixTime(timestamp / 1000), 'PPP');
};

export const normalizeDate = (date: string | number): number => {
  if (typeof date === 'string') {
    return new Date(date).getTime();
  }
  return date.toString().length === 10 ? date * 1000 : date;
};