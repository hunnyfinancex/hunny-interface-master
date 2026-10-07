import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import ToggleButton from '../../../components/ToggleButton';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import LotteryCurrentDraw from './LotteryCurrentDraw';
import LotteryPastDraw from './LotteryPastDraw';

export enum LotteryViewEnum {
  Current,
  Past,
}
const LOTTERY_VIEW_VALUES: [LotteryViewEnum, LotteryViewEnum] = [
  LotteryViewEnum.Current,
  LotteryViewEnum.Past,
];

const LotteryContent: React.FC = () => {
  const { t } = useTranslation();
  const [view, setView] = useState(LotteryViewEnum.Current);

  const handleSelectedViewChanged = useCallback(
    (value: LotteryViewEnum) => {
      setView(value);
    },
    [setView]
  );

  return (
    <StyledWrapper>
      <StyledContainerInner>
        <StyledToggleButtonContainer>
          <ToggleButton
            rightContent={t('Past Draw')}
            leftContent={t('Next Draw')}
            values={LOTTERY_VIEW_VALUES}
            onValueChanged={handleSelectedViewChanged}
            leftButtonTrackingEvent={
              GOOGLE_ANALYTIC_EVENTS.CURRENT_DRAW_LOTTERY_CLICK
            }
            rightButtonTrackingEvent={
              GOOGLE_ANALYTIC_EVENTS.PAST_DRAW_LOTTERY_CLICK
            }
          />
        </StyledToggleButtonContainer>

        <StyledViewContainer
          className={view === LotteryViewEnum.Current ? 'active' : ''}
        >
          <LotteryCurrentDraw />
        </StyledViewContainer>

        <StyledViewContainer
          className={view === LotteryViewEnum.Past ? 'active' : ''}
        >
          <LotteryPastDraw />
        </StyledViewContainer>
      </StyledContainerInner>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Ubuntu';
  margin-bottom: 24px;
`;

const StyledContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledToggleButtonContainer = styled.div`
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  border-radius: 20px;
  width: 60%;
  margin: auto;
  margin-bottom: 64px;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const StyledViewContainer = styled.div`
  opacity: 0;
  pointer-events: none;
  position: absolute;
  overflow: hidden;

  &.active {
    overflow: inherit;
    opacity: 1;
    position: static;
    pointer-events: auto;
    transition: opacity 0.3s ease-in-out;
  }
`;
export default LotteryContent;
