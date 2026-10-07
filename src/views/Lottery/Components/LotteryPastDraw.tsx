import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import LotteryCard from './LotteryCard';
import LotteryDrawSection from './LotteryDrawSection';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';
import { useAppDispatch } from '../../../state';
import { fetchLotteryRound } from '../../../state/lottery';
import { useLotteryRound } from '../../../hooks/Lottery/useLotteryRound';
import HunnyLoader from '../../../components/HunnyLoader';
import SearchControl from '../../../components/SearchControl';
import { Trans, useTranslation } from 'react-i18next';

const LotteryCurrentDraw: React.FC = () => {
  const { t } = useTranslation();

  const currentRoundNumber = useSelector(
    (state: State) => state.lottery.currentRoundNumber
  );

  const [roundNumber, setRoundNumber] = useState(currentRoundNumber - 1);
  const [isSearchInvalid, setIsSearchInvalid] = useState(false);

  const round = useLotteryRound(Number(roundNumber));

  const dispatch = useAppDispatch();

  useEffect(() => {
    setRoundNumber(currentRoundNumber - 1);
  }, [currentRoundNumber]);

  const validateSearch = (value: string) => {
    setIsSearchInvalid(false);
    const currentValue = Number(value);
    if (!currentValue && currentValue != 0) {
      return false;
    }
    return true;
  };

  const handleSearch = (value: string) => {
    if (value == '') {
      return;
    }
    const currentValue = Number(value);
    if (currentValue > 0 && currentValue <= Number(currentRoundNumber)) {
      setRoundNumber(currentValue);
      dispatch(fetchLotteryRound(currentValue));
    } else {
      setIsSearchInvalid(true);
    }
  };

  return (
    currentRoundNumber != null && (
      <StyledWrapper>
        <StyledContainerInner>
          <LotteryCard>
            <SearchControl
              placeholder={t(`Enter Round Number to Search`)}
              handleSearch={handleSearch}
              validate={validateSearch}
              disabled={round.isLoading}
            />
            {isSearchInvalid ? (
              <StyledSearchInvalid>
                <Trans>
                  Please enter round number from #1 to #{{ currentRoundNumber }}{' '}
                  to search
                </Trans>
              </StyledSearchInvalid>
            ) : round.isLoading || currentRoundNumber == null ? (
              <StyledLoaderContainer>
                <HunnyLoader />{' '}
                <StyledLoadingText>
                  <Trans>Loading...</Trans>
                </StyledLoadingText>
              </StyledLoaderContainer>
            ) : (
              <LotteryDrawSection roundNumber={Number(roundNumber)} />
            )}
          </LotteryCard>
        </StyledContainerInner>
      </StyledWrapper>
    )
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Ubuntu';
  max-width: 500px;

  margin: auto;
`;

const StyledContainerInner = styled.div`
  display: flex;
  width: 100%;
`;

const StyledSearchInvalid = styled.div`
  color: ${(props) => props.theme.color.grey[400]};
  letter-spacing: 1px;
  text-align: center;
  margin: 30px 0px;
`;

const StyledSearchIcon = styled(SearchIcon)`
  margin-left: 8px;
  color: white;
`;

const StyledSearchContainer = styled.div`
  border: 1px solid #272f52;
  display: flex;
  align-items: center;
  border-radius: 5px;
  background-color: #191d25;
  margin-bottom: 22px;
  padding: 6px;
`;

const StyledInput = styled.input`
  min-width: 0;
  width: 100%;
  flex: 1 1;
  margin: 0;
  padding: 6px 20px;
  background: none;
  outline: none;
  border: 0;
  font-size: 18px;
  color: #fff;

  &:disabled {
    opacity: 0.6;
  }
`;

const StyledLoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  text-align: center;
  margin: ${(props) => props.theme.spacing[6]}px 0px;
`;

const StyledLoadingText = styled.div`
  margin-left: 12px;
  font-size: 18px;
  color: ${(props) => props.theme.color.grey[200]};
`;
export default LotteryCurrentDraw;
