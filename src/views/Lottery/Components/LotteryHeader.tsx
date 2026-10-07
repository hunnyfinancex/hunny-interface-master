import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useEventCounter } from '../../../hooks/useEventCounter';
import { getUTCDate } from '../../../modules/dateTime';
import { TimeDisplayValuesType } from '../../../modules/models/shared.model';
import { State } from '../../../modules/models/state.model';
import lotteryBanner from './../../../assets/img/lottery-banner.png';

const LotteryHeader: React.FC = () => {
  const { t } = useTranslation();

  const start = useSelector(
    (state: State) => state.lottery.lotteryStartAtHours
  );

  const end = useSelector((state: State) => state.lottery.lotteryEndAtHours);

  const [drawEndedDate, setDrawEndedDate] = useState(getUTCDate(0));
  const [nextDrawStart, setNextDrawStart] = useState(getUTCDate(0));

  const [countdownValue, setCountdownValue] = useState(['...', '...', '...']);
  const [process, setProcess] = useState(0);

  const [isNextRoundStart] = useEventCounter(nextDrawStart, () => {}, 0);

  useEffect(() => {
    if (!end || !start) {
      return;
    }

    const endDateTemplate = getDateTemplate(end);
    const startDateTemplate = getDateTemplate(start);
    const now = getUTCDate(0);

    const drawEndedDate = isNowGTTemplate(start)
      ? new Date(endDateTemplate.setDate(now.getDate() + 1))
      : new Date(endDateTemplate.setDate(now.getDate()));

    const nextDrawStart = isNowGTTemplate(end)
      ? new Date(startDateTemplate.setDate(now.getDate() + 1))
      : new Date(startDateTemplate.setDate(now.getDate()));

    setDrawEndedDate(drawEndedDate);
    setNextDrawStart(nextDrawStart);
  }, [isNextRoundStart, end, start]);

  const updateCountdownValue = (counterValue: TimeDisplayValuesType) => {
    setCountdownValue([
      `${counterValue.days * 24 + counterValue.hours}`,
      `${counterValue.minutes}`,
      `${counterValue.seconds}`,
    ]);
    const now = getUTCDate(0);
    const _startDate = new Date(nextDrawStart);
    const startDate = _startDate.setDate(nextDrawStart.getDate() - 1);

    const process =
      ((now.getTime() - startDate) / (drawEndedDate.getTime() - startDate)) *
      100;
    setProcess(process);
  };

  const getDateTemplate = (dateStr: string) => {
    const [hours, minutes, seconds] = dateStr.split(':');
    const date = getUTCDate(0);
    date.setHours(Number(hours));
    date.setMinutes(Number(minutes));
    date.setSeconds(Number(seconds));

    return new Date(date);
  };

  const isNowGTTemplate = (dateStr: string) => {
    const now = getUTCDate(0);

    const [hours, minutes, seconds] = dateStr.split(':');
    const [nowHours, nowMinutes, nowSeconds] = [
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    ];

    if (nowHours > Number(hours)) {
      return true;
    }

    if (nowHours < Number(hours)) {
      return false;
    }

    if (nowMinutes > Number(minutes)) {
      return true;
    }

    if (nowMinutes < Number(minutes)) {
      return false;
    }

    if (nowSeconds > Number(seconds)) {
      return true;
    }

    if (nowSeconds < Number(seconds)) {
      return false;
    }

    return false;
  };

  const [isDrawingEnded] = useEventCounter(
    drawEndedDate,
    updateCountdownValue,
    0
  );

  return (
    <StyledWrapper>
      <StyledContainerInner>
        <StyledImgContainer>
          <StyledImg src={lotteryBanner} />
        </StyledImgContainer>

        <StyledContentContainer>
          <StyledTitle>
            <Trans>HUNNY Lottery</Trans>
          </StyledTitle>

          <StyledContent>
            <Trans>Buy tickets with 100 HUNNY</Trans>.
          </StyledContent>
          <StyledContent>
            <Trans>Win if 2,3 or 4 of your ticket numbers match!</Trans>
          </StyledContent>

          <StyledProcessBar>
            <div
              className="current-process"
              style={{ width: isDrawingEnded ? '100%' : process + '%' }}
            ></div>
          </StyledProcessBar>

          <StyledContent style={{ marginTop: 10 }}>
            <StyledClock>
              {isDrawingEnded ? '00' : countdownValue[0].padStart(2, '0')}
            </StyledClock>
            :
            <StyledClock>
              {isDrawingEnded ? '00' : countdownValue[1].padStart(2, '0')}
            </StyledClock>
            :
            <StyledClock>
              {isDrawingEnded ? '00' : countdownValue[2].padStart(2, '0')}
            </StyledClock>
            {isDrawingEnded
              ? t('Stay tuned for the results!')
              : t('Until Lottery Draw')}
          </StyledContent>
        </StyledContentContainer>
      </StyledContainerInner>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Ubuntu';
`;

const StyledContainerInner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  background: linear-gradient(270deg, #e960af -10.61%, #f3c622 112.88%);
  margin: 128px 64px 64px 64px;
  border-radius: 16px;

  @media (max-width: 767px) {
    margin: 64px 0px 64px 0px;
  }
`;

const StyledImgContainer = styled.div`
  width: 230px;
  position: relative;

  @media (max-width: 767px) {
    display: none;
  }
`;
const StyledImg = styled.img`
  position: absolute;
  height: 280px;
  top: -92px;
  left: -100px;

  transition: 0.2s;

  &:hover {
    transform: scale(1.1, 1.1);
  }
`;

const StyledContentContainer = styled.div`
  flex-grow: 1;
`;

const StyledContent = styled.div`
  color: white;
  font-size: 16px;
  line-height: 18px;
  letter-spacing: -0.02em;
`;

const StyledTitle = styled.div`
  color: white;
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 12px;
`;

const StyledProcessBar = styled.div`
  background: rgba(225, 225, 225, 0.2);
  border-radius: 64px;
  position: relative;

  height: 18px;
  margin: 12px 0px;

  .current-process {
    transition: 1s;
    background: #f3c622;
    border-radius: 64px;
    width: 0%;
    height: 100%;
    left: 0;
  }
`;

const StyledClock = styled.span`
  background: #191d25;
  border-radius: 5px;
  padding: 4px;
  margin: 2px;
`;

export default LotteryHeader;
