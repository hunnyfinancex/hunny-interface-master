import React from 'react';
import styled from 'styled-components';
import ToggleButton from '../../../components/ToggleButton';
import FarmCardItem from './../components/FarmCardItem';
import { PoolTypeEnum } from '../../../modules/enums/Pool.enum';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';
import { useAppDispatch } from '../../../state';
import { setSearchValue, setSelectedPoolType } from '../../../state/pools';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import { Trans, useTranslation } from 'react-i18next';
import SearchControl from 'components/SearchControl';
import AssetsSelect from './AssetsSelect';
import { usePoolFilter } from 'hooks/Pool/usePoolFilter';
import PoolList from './PoolList';

const FarmList: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const selectedIds = usePoolFilter();

  const poolList = useSelector(
    (state: State) => state.pools.pools[state.pools.selectedPoolType]
  );

  const depositedPoolIds = useSelector((state: State) =>
    state.pools.depositedPoolIds[state.pools.selectedPoolType].filter((item) =>
      selectedIds.has(item)
    )
  );

  const activePoolIds = useSelector(
    (state: State) => state.pools.activePoolIds[state.pools.selectedPoolType]
  )
    .filter((item) => !depositedPoolIds.includes(item))
    .filter((item) => selectedIds.has(item));

  const unsupportedPoolIds = useSelector(
    (state: State) =>
      state.pools.unsupportedPoolIds[state.pools.selectedPoolType]
  )
    .filter((item) => !depositedPoolIds.includes(item))
    .filter((item) => selectedIds.has(item));

  const dispatch = useAppDispatch();

  const handleSelectedPoolChanged = (value: PoolTypeEnum) => {
    dispatch(setSelectedPoolType(value));
  };

  const handleSearch = async (value: string) => {
    dispatch(setSearchValue(value));
  };

  return (
    <StyledWrapper>
      <StyledContainerInner>
        <StyledToggleButtonContainer>
          <ToggleButton
            rightContent={t('ETH Pool')}
            leftContent={t('BSC Pool')}
            values={[PoolTypeEnum.BSC, PoolTypeEnum.ETH]}
            onValueChanged={handleSelectedPoolChanged}
            leftButtonTrackingEvent={GOOGLE_ANALYTIC_EVENTS.BSC_POOL_CLICK}
            rightButtonTrackingEvent={GOOGLE_ANALYTIC_EVENTS.ETH_POOL_CLICK}
          />
        </StyledToggleButtonContainer>

        <StyledSearchContainer>
          <StyledSearchControlContainer>
            <SearchControl
              handleSearch={handleSearch}
              placeholder={t('Search')}
            />
          </StyledSearchControlContainer>
          <StyledProviderSelectContainer>
            <AssetsSelect />
          </StyledProviderSelectContainer>
        </StyledSearchContainer>

        <StyledPoolSection>
          {poolList.length > 0 ? (
            <>
              {depositedPoolIds.length > 0 ? (
                <StyledHiveContainer>
                  <StyledPoolSectionTitle>
                    <Trans>
                      Deposited Pools ({{ total: depositedPoolIds.length }})
                    </Trans>
                  </StyledPoolSectionTitle>
                  {depositedPoolIds.map((item: number, index: number) => (
                    <FarmCardItem key={item} poolId={item} />
                  ))}
                </StyledHiveContainer>
              ) : null}

              <PoolList />

              {activePoolIds.length > 0 ? (
                <StyledHiveContainer>
                  <StyledPoolSectionTitle>
                    <Trans>
                      Active Pools ({{ total: activePoolIds.length }})
                    </Trans>
                  </StyledPoolSectionTitle>

                  {activePoolIds.map((item: number, index: number) => (
                    <FarmCardItem key={item} poolId={item} />
                  ))}
                </StyledHiveContainer>
              ) : null}
              {unsupportedPoolIds.length > 0 ? (
                <StyledHiveContainer>
                  <StyledPoolSectionTitle>
                    <Trans>
                      Retired Pools ({{ total: unsupportedPoolIds.length }})
                    </Trans>
                  </StyledPoolSectionTitle>
                  {unsupportedPoolIds.map((item: number, index: number) => (
                    <FarmCardItem key={item} poolId={item} />
                  ))}
                </StyledHiveContainer>
              ) : null}
            </>
          ) : (
            <StyledGiphyContainer>
              <StyledGiphyIframe
                src="https://giphy.com/embed/xTiTnFadX2hVp4CtAA"
                width="100%"
                height="100%"
                title="ETH Farm - Under Construction"
              ></StyledGiphyIframe>
              <p style={{ textAlign: 'center' }}>
                <a href="https://giphy.com/gifs/khoroshavina-breakfast-yummy-pancake-xTiTnFadX2hVp4CtAA">
                  via GIPHY
                </a>
              </p>
            </StyledGiphyContainer>
          )}
        </StyledPoolSection>
      </StyledContainerInner>
    </StyledWrapper>
  );
});

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Ubuntu';
`;

const StyledHiveContainer = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledSearchContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 48px;
  margin-bottom: 24px;
  position: relative;

  @media (max-width: 767px) {
    margin-top: 24px;
    margin-bottom: 12px;
    position: relative;
  }
`;

const StyledSearchControlContainer = styled.div`
  flex: 1;
  margin-right: 24px;
  @media (max-width: 767px) {
    margin-right: 8px;
  }
`;

const StyledProviderSelectContainer = styled.div`
  height: 46px;
  width: 238px;

  @media (max-width: 767px) {
    position: static;
    width: 50px;
  }
`;

const StyledContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const StyledToggleButtonContainer = styled.div`
  margin-top: ${(props) => props.theme.spacing[4]}px;
  height: 46px;
  line-height: 46px;
  border-radius: 20px;
`;

const StyledPoolSection = styled.div`
  width: 100%;
`;

const StyledPoolSectionTitle = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;

  color: ${(props) => props.theme.color.yellow[100]};
`;

const StyledGiphyContainer = styled.div`
  border: none;
  width: 100%;
  height: 0;
  padding-bottom: 75%;
  position: relative;
`;

const StyledGiphyIframe = styled.iframe`
  position: absolute;
  border: none;
`;

export default FarmList;
