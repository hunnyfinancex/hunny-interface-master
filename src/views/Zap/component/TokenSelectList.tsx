import React, { useState } from 'react';
import styled from 'styled-components';
import { TokenDisplay } from '../../../modules/models/tokenDisplay.model';
import NumberDisplay from '../../../components/NumberDisplay';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';
import { useAppDispatch } from '../../../state';
import { ZapTabEnum } from '../../../modules/enums/Zap.enum';
import {
  updatePayToken,
  updateReceiveToken,
  updateTab,
} from '../../../state/zap';
import SearchControl from '../../../components/SearchControl';
import { Trans, useTranslation } from 'react-i18next';
import { useWallet } from 'use-wallet';

const TokenSelectList: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const [searchValue, setSearchValue] = useState('');
  const listTokenDropDown = useSelector(
    (state: State) => state.zap.listTokenDropDown
  );

  const tab = useSelector((state: State) => state.zap.tab);

  const selectedToken = useSelector((state: State) =>
    state.zap.tab === ZapTabEnum.PayTokenList
      ? state.zap.payToken
      : state.zap.receiveToken
  );

  const handleSelectToken = (token: TokenDisplay) => {
    dispatch(
      tab === ZapTabEnum.PayTokenList
        ? updatePayToken(token)
        : updateReceiveToken(token)
    );
    dispatch(updateTab(ZapTabEnum.Dashboard));
  };

  const handleSearchToken = (tokenName: string) => {
    setSearchValue(tokenName.toLowerCase().trim());
  };

  const listToken = searchValue
    ? listTokenDropDown.filter((item) =>
        item.token.name.toLowerCase().includes(searchValue)
      )
    : listTokenDropDown;

  return (
    <>
      <SearchControl
        handleSearch={handleSearchToken}
        placeholder={t('Search Token')}
      />
      <StyledListContainer>
        {listToken.map((item, i) => (
          <StyledTokenOptionContainer
            className={
              selectedToken === item.token || item.disabled ? 'disable' : ''
            }
            key={i}
            onClick={() => handleSelectToken(item.token)}
          >
            <StyledTokenLogo src={item.token.logo} />
            <StyledTokenName> {item.token.name} </StyledTokenName>
            <StyledTokenDescription>
              {item.disabled ? (
                <Trans>Coming</Trans>
              ) : (
                <NumberDisplay
                  value={item.balance}
                  decimals={item.token.decimals}
                />
              )}
            </StyledTokenDescription>
          </StyledTokenOptionContainer>
        ))}
      </StyledListContainer>
    </>
  );
};

const StyledTokenOptionContainer = styled.div`
  display: flex;
  border-radius: 10px;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  border-radius: 5px;
  cursor: pointer;

  &.disable {
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  }

  &:hover {
    background-color: rgba(233, 96, 175, 0.1);
  }
`;

const StyledListContainer = styled.div`
  height: 450px;
  overflow: auto;
`;

const StyledTokenLogo = styled.img`
  height: 24px;
`;

const StyledTokenName = styled.div`
  flex-grow: 1;
  font-size: 14px;
  margin-left: 6px;
  color: ${(props) => props.theme.color.grey[100]};
`;
const StyledTokenDescription = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 18px;
  text-align: right;
  letter-spacing: -0.02em;

  color: #ffffff;
`;

export default TokenSelectList;
