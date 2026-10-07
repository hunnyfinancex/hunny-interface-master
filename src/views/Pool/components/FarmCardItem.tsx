import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import HunnyTooltip from '../../../components/Tooltip/Tooltip';
import coverDesktop from '../../../assets/img/hunny-desktop-cover.png';
import coverMobile from '../../../assets/img/hunny-mobile-cover.png';
import { delineate, toTokenUnitsBN } from '../../../modules/number';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';
import newLabel from '../../../assets/img/new-label.png';
import comingLabel from '../../../assets/img/coming-label.png';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import analytics from '../../../modules/analytics';
import { Trans, useTranslation } from 'react-i18next';
import HunnyBadges from 'components/HunnyBadges';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import { AssetEnum } from 'modules/enums/Asset.enum';

export interface FarmCardItemProps {
  poolId: number;
}

const FarmCardItem: React.FC<FarmCardItemProps> = ({ poolId }) => {
  const { t } = useTranslation();
  const [apyValue, setApyValue] = useState(t('Loading...') as any);
  const [aprValue, setAprValue] = useState('');

  const poolDetails = useSelector((state: State) =>
    state.pools.pools[state.pools.selectedPoolType].find(
      (item) => item.id === poolId
    )
  );

  const balanceInUsd = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).balanceInUsd
  );
  const tvl = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).tvl
  );
  const apy = useSelector(
    (state: State) =>
      state.pools.pools[state.pools.selectedPoolType].find(
        (item) => item.id === poolId
      ).apy
  );

  useEffect(() => {
    if (poolDetails.tag.includes(AssetEnum.Hunny)) {
      setApyValue('0');
      setAprValue('0');
    } else if (!poolDetails.isDisabled && apy) {
      if (poolDetails.isHaveApr) {
        setApyValue(apy[0]?.toFixed(2));
        setAprValue(apy[1]?.toFixed(2));
      } else {
        const _apy = apy[0];
        setApyValue(_apy?.toFixed(2));
        setAprValue('');
      }
    }
  }, [apy, setAprValue, setApyValue]);

  return (
    <StyledContainer
      onClick={() =>
        analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.CLICK_POOL, poolDetails.code)
      }
      style={{
        pointerEvents: poolDetails.isDisabled ? 'none' : 'auto',
      }}
      to={`/pools/${poolDetails.code}`}
      className={poolDetails.isBoost ? 'boost' : ''}
    >
      {poolDetails.isNew ? <StyledNewLabel src={newLabel} /> : null}
      {poolDetails.isComingSoon ? <StyledNewLabel src={comingLabel} /> : null}

      <StyledPoolContainer>
        <StyledIcon>
          <img src={poolDetails.logo} height="46" />
        </StyledIcon>

        <StyledNameContainer
          data-for={`noti-${poolDetails.code}`}
          data-tip={
            poolDetails.isVesting
              ? t(
                  `LOVE Maximizer use a unique compounding strategy. The pool converts rewards to LOVE & auto-compound profit to achieve the highest APYs while still protecting initial capital.`
                )
              : t(`Withdraw and Deposit to the new pools to earn HUNNY`)
          }
        >
          <StyledTitle>{poolDetails.poolName} </StyledTitle>
          <StyledSubTitle>
            {t(poolDetails.additionalContent)}{' '}
            {poolDetails.isVesting && <StyledInfoIcon />}
          </StyledSubTitle>

          {poolDetails.isPause && (
            <>
              <div style={{ height: 4 }} />
              <HunnyBadges type="error">
                <PauseRoundedIcon />
                <Trans>Deposit Pause</Trans>
              </HunnyBadges>
            </>
          )}

          {(poolDetails.isVesting || poolDetails.isWarning) && (
            <HunnyTooltip id={`noti-${poolDetails.code}`} place="top" />
          )}
        </StyledNameContainer>

        <StyledRateContainer>
          <StyledApyInfo>
            {poolDetails.isDisabled ? t(`Coming`) : `${delineate(apyValue)}%`}
            {poolDetails.apyDescription ? (
              <StyledInfoIcon
                data-for={`apy-description-${poolDetails.code}`}
                data-tip={t(poolDetails.apyDescription)}
              />
            ) : null}
          </StyledApyInfo>

          {aprValue ? (
            <StyledAprInfo>
              <Trans>APR</Trans> {`${delineate(aprValue)}%`}
            </StyledAprInfo>
          ) : null}
          <StyledDescription>{t(poolDetails.description)}</StyledDescription>
        </StyledRateContainer>

        <StyledDetailsReturn>
          <StyledDetailsLabel>
            <Trans>Earn</Trans>
          </StyledDetailsLabel>
          <StyledDetailsValue>
            {poolDetails.earn.map((item) => item.name).join(' + ')}
          </StyledDetailsValue>
        </StyledDetailsReturn>

        <StyledDetailsBalance>
          <StyledDetailsLabel>
            <Trans>Balance</Trans>
          </StyledDetailsLabel>
          <StyledDetailsValue>
            {balanceInUsd
              ? '$' + delineate(toTokenUnitsBN(balanceInUsd, 18).toFixed(2))
              : ' ...'}
          </StyledDetailsValue>
        </StyledDetailsBalance>

        <StyledDetailsTotal>
          <StyledDetailsLabel>
            <Trans>Total Deposit</Trans>
          </StyledDetailsLabel>
          <StyledDetailsValue>
            {tvl ? '$' + delineate(toTokenUnitsBN(tvl, 18).toFixed(2)) : ' ...'}
          </StyledDetailsValue>
        </StyledDetailsTotal>

        <HunnyTooltip
          id={`apy-description-${poolDetails.code}`}
          place="bottom"
        />
        <HunnyTooltip id={`apy-warning-${poolDetails.code}`} place="bottom" />
      </StyledPoolContainer>

      {poolDetails.additionalImgMobile ? (
        <StyledAdditionalMobileImg src={poolDetails.additionalImgMobile} />
      ) : null}
      {poolDetails.additionalImg ? (
        <StyledAdditionalImg src={poolDetails.additionalImg} />
      ) : null}
    </StyledContainer>
  );
};

const StyledContainer = styled(Link)`
  position: relative;
  transition: 0.2s;
  margin-bottom: 16px;
  cursor: pointer;

  font-family: 'Ubuntu';
  min-height: 106px;

  width: 100%;
  display: block;

  background: rgba(2, 12, 32, 0.9);
  border: 1px solid #272f52;
  border-radius: 5px;

  text-decoration: none;

  pointer-events: auto;
  background-size: 100% auto;
  background-repeat: no-repeat;

  &:hover {
    border: 1px solid ${(props) => props.theme.color.purple[200]};
    background-position: 75%;
  }

  &.boost {
    background-image: url(${coverDesktop});
    @media (max-width: 767px) {
      background-image: url(${coverMobile});
    }
  }
`;

const StyledPoolContainer = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  display: grid;
  justify-content: stretch;
  grid-template-rows: auto;
  grid-template-columns: 0.3fr 1.6fr 2fr 2fr;
  grid-template-areas:
    'icon label rates return'
    'icon label rates balance'
    'icon label rates total';
  padding: 16px 48px 16px 32px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr 3fr 3fr;
    grid-template-areas:
      'icon label rates'
      'return return return'
      'balance balance balance'
      'total total total';
    padding: 16px 16px;

    @media (max-width: 767px) {
      padding: 16px 12px;
    }
  }
`;

const StyledNewLabel = styled.img`
  position: absolute;
  height: 72px;
  top: -8px;
  left: -9px;
`;

const StyledAdditionalImg = styled.img`
  width: 100%;
  height: auto;
  opacity: 0.9;
  margin-top: -1.9em;

  display: block;

  @media (max-width: 767px) {
    margin-top: -1.6em;
  }

  @media (max-width: 425px) {
    display: none;
  }
`;

const StyledAdditionalMobileImg = styled.img`
  width: 100%;
  height: auto;
  opacity: 0.9;
  margin-top: -3em;

  display: none;
  @media (max-width: 425px) {
    display: block;
  }
`;

const StyledIcon = styled.div`
  grid-area: icon;
  place-self: center start;

  @media (max-width: 767px) {
    place-self: center;
  }
`;

const StyledTitle = styled.div``;

const StyledSubTitle = styled.div`
  font-size: 14px;
  margin-top: 2px;
  opacity: 0.8;
  color: ${(props) => props.theme.color.yellow[100]};
  display: flex;
`;

const StyledNameContainer = styled.div`
  grid-area: label;
  place-self: center start;
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 16px;
  font-weight: bold;
  color: #ec6998;
  margin-left: 8px;
  line-height: 22px;

  @media (max-width: 767px) {
    text-align: right;
  }

  @media (max-width: 767px) {
    margin-left: 4px;
  }
`;

const StyledRateContainer = styled.div`
  grid-area: rates;
  place-self: start;
  padding-left: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  @media (max-width: 767px) {
    place-self: end;
    padding-left: 0;
    text-align: right;
  }
`;

const StyledApyInfo = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 34px;
  color: #f3c622;
  text-shadow: 0px 0px 12px #f3c622;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;

  @media (max-width: 425px) {
    font-size: 28px;
  }
`;

const StyledInfoIcon = styled(InfoIcon)`
  height: 20px !important;
  margin-bottom: 6px;
  margin-left: 2px;
`;

const StyledAprInfo = styled.div`
  font-style: normal;
  font-size: 14px;
  line-height: 22px;
  color: #f3c622;
`;

const StyledDescription = styled.div`
  font-style: normal;
  font-size: 14px;
  color: #f3c622;

  @media (max-width: 767px) {
    display: none;
  }
`;

const StyledDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 2px 0px;
`;

const StyledDetailsTotal = styled(StyledDetails)`
  grid-area: total;
`;

const StyledDetailsBalance = styled(StyledDetails)`
  grid-area: balance;
`;

const StyledDetailsReturn = styled(StyledDetails)`
  grid-area: return;
  margin-top: 4px;

  @media (max-width: 425px) {
    margin-top: 12px;
  }
`;

const StyledDetailsValue = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[200]};
  text-align: right;
`;

const StyledDetailsLabel = styled.div`
  font-size: 14px;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.color.grey[400]};
  flex-shrink: 0;
  text-align: left;
`;

export default FarmCardItem;
