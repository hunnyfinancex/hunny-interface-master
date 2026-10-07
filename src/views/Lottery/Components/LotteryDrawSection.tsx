import { Grid } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import hunnyLogo from '../../../assets/img/hunny-logo.png';
import LotteryBall from './LotteryBall';
import NumberIncreaseEffect from '../../../components/NumberIncreaseEffect';
import { useLotteryRound } from '../../../hooks/Lottery/useLotteryRound';
import NumberDisplay from '../../../components/NumberDisplay';
import { toTokenUnitsBN } from '../../../modules/number';
import LotteryViewMyTicket from './LotteryViewMyTicket';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';
import { Trans, useTranslation } from 'react-i18next';

export interface LotteryDrawSectionProps {
  roundNumber: number;
}
const LotteryDrawSection: React.FC<LotteryDrawSectionProps> = ({
  roundNumber,
}) => {
  const { t } = useTranslation();

  const hunnyPrice = useSelector((state: State) => state.app.hunnyPrice);

  const currentRoundNumber = useSelector(
    (state: State) => state.lottery.currentRoundNumber
  );

  const round = useLotteryRound(roundNumber);

  return (
    roundNumber && (
      <StyledWrapper>
        <StyledContainerInner>
          <StyledHeader>
            <Trans>Round #{{ roundNumber }}</Trans>
          </StyledHeader>
          <div style={{ flexGrow: 1 }}>
            {round.winningNumber && (
              <Grid
                style={{ marginTop: 12, marginBottom: 6 }}
                container
                spacing={2}
              >
                <Grid item>
                  <StyledWinningLabel>
                    <Trans>Winning Numbers</Trans>
                  </StyledWinningLabel>
                  <StyledWinningNumber>
                    <LotteryBall value={round.winningNumber[0]} />
                    <LotteryBall value={round.winningNumber[1]} />
                    <LotteryBall value={round.winningNumber[2]} />
                    <LotteryBall value={round.winningNumber[3]} />
                  </StyledWinningNumber>
                </Grid>
              </Grid>
            )}

            <Grid
              style={{ marginTop: 6, marginBottom: 12 }}
              container
              spacing={2}
            >
              <Grid item>
                <StyledTotalPotLabel>
                  <Trans>Total Pot</Trans>
                </StyledTotalPotLabel>
                <StyledTotalPotValue
                  style={round.winningNumber ? {} : { fontSize: 32 }}
                >
                  <img
                    alt={'hunny logo'}
                    style={{ width: 48 }}
                    src={hunnyLogo}
                  />

                  {currentRoundNumber == round.roundNumber ? (
                    <>
                      <NumberIncreaseEffect
                        value={Number(toTokenUnitsBN(round.totalPot, 18))}
                        fixed={3}
                      />
                      <StyledEstimateUsd>
                        (~ $
                        <NumberIncreaseEffect
                          value={toTokenUnitsBN(
                            round.totalPot.multipliedBy(hunnyPrice),
                            18
                          ).toNumber()}
                        />
                        )
                      </StyledEstimateUsd>
                    </>
                  ) : (
                    <>
                      <NumberDisplay value={round.totalPot} fixed={3} />
                      <StyledEstimateUsd>
                        (~ $
                        <NumberDisplay
                          value={round.totalPot.multipliedBy(hunnyPrice)}
                          fixed={0}
                        />
                        )
                      </StyledEstimateUsd>
                    </>
                  )}
                </StyledTotalPotValue>
              </Grid>
            </Grid>
            <StyledStroke />

            <Grid container spacing={1} justify="space-between">
              <Grid item xs={round.winners ? 3 : 6}>
                <StyledTableHeader className="left">
                  <Trans>No. Matched</Trans>
                </StyledTableHeader>
              </Grid>
              {round.winners ? (
                <Grid item xs={3}>
                  <StyledTableHeader>
                    <Trans>Winners</Trans>
                  </StyledTableHeader>
                </Grid>
              ) : null}
              <Grid item xs={6}>
                <StyledTableHeader className="right">
                  <Trans>Prize Pot</Trans>
                </StyledTableHeader>
              </Grid>
            </Grid>
            {round.potDetails.map((item, index) => (
              <Grid container spacing={1} justify="space-between" key={index}>
                <Grid
                  item
                  xs={round.winningNumber && item.number != -1 ? 3 : 6}
                >
                  <StyledTableCell
                    className={item.number == 4 ? 'left highlight' : 'left'}
                  >
                    {item.number == -1 ? t('To Burn') : item.number}
                  </StyledTableCell>
                </Grid>
                {round.winners && item.number != -1 && (
                  <Grid item xs={3}>
                    <StyledTableCell
                      className={item.number == 4 ? 'highlight' : ''}
                    >
                      {round.winners[index]}
                    </StyledTableCell>
                  </Grid>
                )}
                <Grid item xs={6}>
                  <StyledPrizeValueCell
                    className={item.number == 4 ? 'left highlight' : 'left'}
                  >
                    <NumberDisplay value={item.prize} fixed={3} />
                    <StyledEstimateUsdGrey>
                      {`(~ $${toTokenUnitsBN(
                        item.prize.multipliedBy(hunnyPrice),
                        18
                      ).toFixed(3)})`}
                    </StyledEstimateUsdGrey>
                  </StyledPrizeValueCell>
                </Grid>
              </Grid>
            ))}
          </div>
          {round.winningNumber && (
            <StyledSectionFooter>
              <StyledStroke />
              <LotteryViewMyTicket roundNumber={roundNumber} />
            </StyledSectionFooter>
          )}
        </StyledContainerInner>
      </StyledWrapper>
    )
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Ubuntu';
  height: 100%;
`;

const StyledContainerInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
`;

const StyledWinningLabel = styled.div`
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.02em;
  color: ${(props) => props.theme.color.grey[300]};
`;

const StyledTotalPotLabel = styled(StyledWinningLabel)``;

const StyledWinningNumber = styled.div`
  margin-top: 12px;
`;

const StyledTotalPotValue = styled.div`
  margin-top: 8px;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  display: flex;
  align-items: center;

  color: ${(props) => props.theme.color.purple[200]};

  text-shadow: 0px 0px 12px ${(props) => props.theme.color.purple[200]};

  flex-wrap: wrap;
`;

const StyledEstimateUsd = styled.span`
  font-size: 14px;
  margin-left: 8px;
  font-weight: 100;
  color: ${(props) => props.theme.color.yellow[100]};

  @media (max-width: 424px) {
    font-size: 12px;
  }
`;

const StyledEstimateUsdGrey = styled(StyledEstimateUsd)`
  font-size: 12px;
  margin-top: 2px;
  color: ${(props) => props.theme.color.grey[300]};
`;

const StyledStroke = styled.div`
  width: 100%;
  border-top: 2px solid #272f52;
  opacity: 0.5;
  margin: 12px 0px;
`;

const StyledTableHeader = styled.div`
  font-size: 14px;
  font-weight: bold;
  line-height: 14px;
  letter-spacing: -0.02em;
  text-align: center;
  color: ${(props) => props.theme.color.grey[300]};
  padding: 12px 0px;

  @media (max-width: 424px) {
    font-size: 12px;
  }

  &.left {
    text-align: left;
  }

  &.right {
    text-align: right;
  }
`;

const StyledTableCell = styled(StyledTableHeader)`
  color: white;
  font-size: 18px;

  @media (max-width: 424px) {
    font-size: 14px;
  }

  &.highlight {
    color: ${(props) => props.theme.color.purple[200]};
  }
`;

const StyledPrizeValueCell = styled(StyledTableCell)`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: flex-end;

  @media (max-width: 424px) {
    font-size: 16px;
  }
`;

const StyledSectionFooter = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export default LotteryDrawSection;
