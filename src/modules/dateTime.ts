import { TIME_ZONE } from '../constants/values';
import { TimeDisplayValuesType } from './models/shared.model';

export function getUTCDate(timezone: number): Date {
  return new Date(
    new Date(new Date().getTime() + timezone * 3600 * 1000)
      .toUTCString()
      .replace(/ GMT$/, '')
  );
}

export const DEFAULT_TIME = { days: 0, hours: 0, minutes: 0, seconds: 0 };

export function generateTimeDisplay(
  endate: Date,
  timezone?: number
): TimeDisplayValuesType {
  const targetDate = endate.getTime();
  const rightJustNow = getUTCDate(
    timezone == 0 ? timezone : timezone || TIME_ZONE
  ).getTime();

  const runway = targetDate - rightJustNow;

  const stateObj = {
    days: Math.floor(runway / (1000 * 60 * 60 * 24)),
    hours: Math.floor((runway % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((runway % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((runway % (1000 * 60)) / 1000),
  };

  if (
    stateObj.days <= 0 &&
    stateObj.hours <= 0 &&
    stateObj.minutes <= 0 &&
    stateObj.seconds <= 0
  ) {
    return DEFAULT_TIME;
  }

  return stateObj;
}
