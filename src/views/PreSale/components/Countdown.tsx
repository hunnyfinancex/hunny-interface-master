// wow writing react without webpack sure does suck!

import React, { useEffect } from 'react';
import styled from 'styled-components';
import { TIME_ZONE } from '../../../constants/values';
import { getUTCDate } from '../../../modules/dateTime';

// ts
interface TimeDisplayValuesType {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CounterType {
  displayValue: number;
  label: string;
}
export interface CounterProps {
  endDate: Date;
  label: string;
  onEnded?: () => void;
}

const DEFAULT_TIME = { days: 0, hours: 0, minutes: 0, seconds: 0 };

// timing
const generateTimeDisplay = (endate: Date): TimeDisplayValuesType => {
  const targetDate = endate.getTime();
  const rightJustNow = getUTCDate(0).getTime();

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
};

// components
const Counter: React.FC<CounterType> = ({ displayValue, label }) => (
  <StyledCounter>
    <h2>{label}</h2>
    {displayValue}
  </StyledCounter>
);

const Countdown: React.FC<CounterProps> = ({ endDate, label, onEnded }) => {
  const [timeDisplay, setTimeDisplay] = React.useState<TimeDisplayValuesType>(
    generateTimeDisplay(endDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const _timeDisplay = generateTimeDisplay(endDate);
      if (_timeDisplay === DEFAULT_TIME) {
        onEnded();
        clearInterval(interval);
      }
      setTimeDisplay(_timeDisplay);
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <StyledContainer>
      <StyledDate>
        <h1>{label}</h1>
      </StyledDate>
      <StyledWrapper>
      <Counter
          displayValue={timeDisplay.days}
          label={'Days'}
        />
        <Counter
          displayValue={timeDisplay.hours}
          label={'Hours'}
        />
        <Counter displayValue={timeDisplay.minutes} label={'Minutes'} />
        <Counter displayValue={timeDisplay.seconds} label={'Seconds'} />
      </StyledWrapper>
    </StyledContainer>
  );
};

const StyledContainer = styled.section`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0 24px;
  @media (max-width: 420px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 24px;
  }
`;

const StyledDate = styled.header`
  margin-bottom: 28px;
  & h1 {
    font-family: 'Ubuntu', mono;
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 0.1875em;
    margin: unset;
    text-align: center;
    text-transform: uppercase;
    color: ${(props) => props.theme.color.yellow[100]};
  }
  @media (max-width: 768px) {
    margin-bottom: 18px;

    & h1 {
      font-size: 22px;
    }
  }
  @media (max-width: 576px) {
    & h1 {
      font-size: 18px;
    }
  }
`;

const StyledCounter = styled.div`
  background: rgba(255, 255, 255, 0.025);
  color: ${(props) => props.theme.color.yellow[100]};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  font-family: 'JetBrains Mono', mono;
  font-size: 36px;
  font-weight: 700;
  line-height: 30px;
  padding: 16px 32px 8px;
  text-align: center;

  h2 {
    font-size: 20px;
    font-weight: 500;
    margin: 1.25rem 0 0;
    order: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
    width: 100%;
  }
  @media (max-width: 768px) {
    padding: 16px 16px 8px 16px;
    font-size: 24px;

    & h2 {
      font-size: 18px;
    }
  }
  @media (max-width: 576px) {
    padding: 8px 8px 8px 8px;
    font-size: 20px;
    & h2 {
      font-size: 16px;
    }
  }
  @media (max-width: 420px) {
    padding: 16px 32px 8px;
    font-size: 22px;

    & h2 {
      font-size: 16px;
    }
  }
`;

export default Countdown;
