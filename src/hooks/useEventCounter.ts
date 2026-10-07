import { useEffect, useState } from 'react';
import { TIME_ZONE } from '../constants/values';
import {
  DEFAULT_TIME,
  generateTimeDisplay,
  getUTCDate,
} from '../modules/dateTime';
import { TimeDisplayValuesType } from '../modules/models/shared.model';

export const useEventCounter = (
  endDate: Date,
  displayFn?: (counterValue: TimeDisplayValuesType) => any,
  timezone = TIME_ZONE
) => {
  const [isEventEnded, setIsEventEnded] = useState(
    getUTCDate(timezone) > endDate
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const _timeDisplay = generateTimeDisplay(endDate, timezone);
      if (_timeDisplay === DEFAULT_TIME) {
        setIsEventEnded(true);
        clearInterval(interval);
        return;
      }
      if (displayFn) {
        displayFn(_timeDisplay);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate, displayFn]);

  return [isEventEnded];
};
