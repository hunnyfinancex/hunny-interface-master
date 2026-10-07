import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { toBaseUnitBN, toTokenUnitsBN } from '../../../modules/number';
import {
  TokenDisplay,
  TokenLP,
} from '../../../modules/models/tokenDisplay.model';
import NumberDisplay from '../../../components/NumberDisplay';
import { useGetTokenBalance } from '../../../hooks/useZap';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { TOKENS_ZAP } from '../../../constants/tokens';
import { estimateGasZapIn } from '../../../modules/zap';
import { getAddress } from '../../../modules/utils';
import { useWallet } from 'use-wallet';
import { Trans, useTranslation } from 'react-i18next';

export interface ZapTokenControlProps {
  token: TokenDisplay;
  label: string;
  value: string;
  openSelectToken: (token: TokenDisplay) => void;
  onChange?: (value: string) => void;
  readonly?: boolean;
  setError?: (value: string) => void;
}

export const ZapTokenControl: React.FC<ZapTokenControlProps> = ({
  token,
  label,
  value,
  openSelectToken,
  onChange,
  readonly,
  setError,
}) => {
  const { t } = useTranslation();

  const { ethereum, account } = useWallet();
  const [errorHint, setErrorHint] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isNoToken, setIsNoToken] = useState(false);

  const balance = useGetTokenBalance(token);

  useEffect(() => {
    if (readonly) {
      return;
    }

    if (!token) {
      setErrorHint('');
      setIsNoToken(true);
      setIsInvalid(true);
    } else {
      validate(value);
    }
  }, [token, balance]);

  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(',', '.');
      const currentValue = Number(value); // some mobile device keyboard show comma instead of dot
      if (!currentValue && currentValue !== 0) {
        return;
      }

      validate(value);

      onChange(e.target.value);
    },
    [onChange, balance]
  );

  const validate = (value: string) => {
    if (readonly) return;

    const parsedValue = new BigNumber(value);

    const maxValue = toTokenUnitsBN(balance, token.decimals);
    const minValue = 0;

    if (maxValue.lt(parsedValue) || parsedValue.lt(minValue)) {
      const msg = 'Insufficient balance';
      setErrorHint(msg);
      setIsInvalid(true);
      if (setError) {
        setError(msg);
      }
    } else {
      resetErr();
    }
  };

  const handleOpenSelectToken = useCallback(() => {
    openSelectToken(token);
  }, [token]);

  const fillMaxBalance = async () => {
    if (token.name === TOKENS_ZAP.BNB.name) {
      const txFee = await estimateGasZapIn(
        ethereum,
        account,
        getAddress(TOKENS_ZAP.HUNNY.addresses),
        balance
      );
      const parsedTxFee = toBaseUnitBN(txFee, 18);
      const value = balance.gt(parsedTxFee)
        ? balance.minus(parsedTxFee).toString(10)
        : '0';

      onChange(toTokenUnitsBN(value, 18).toString(10));
    } else {
      onChange(toTokenUnitsBN(balance, token.decimals).toString(10));
    }
    resetErr();
  };

  const resetErr = () => {
    setErrorHint('');
    setIsInvalid(false);
    if (setError) {
      setError('');
    }
  };

  const isRemoveToken = !!(token?.token0 && token?.token1);

  return (
    <StyledZapControlContainer>
      <StyledLabelContainer>
        <StyledLabel>{label}</StyledLabel>

        {!readonly ? (
          <StyledAvailableTextClickable onClick={fillMaxBalance}>
            <Trans>Available</Trans>:{' '}
            <NumberDisplay
              value={balance}
              fixed={6}
              decimals={token?.decimals || 18}
            />
          </StyledAvailableTextClickable>
        ) : (
          !isRemoveToken && (
            <StyledAvailableText>
              <Trans>Available</Trans>:{' '}
              <NumberDisplay
                value={balance}
                fixed={6}
                decimals={token?.decimals || 18}
              />
            </StyledAvailableText>
          )
        )}
      </StyledLabelContainer>

      <TokenSelect
        token={token}
        isDisabled={isRemoveToken}
        handleOpenSelectToken={handleOpenSelectToken}
      />
      {value != null && (
        <StypedTokenInput
          className={isInvalid ? 'error' : ''}
          placeholder="0"
          value={value}
          step="0.1"
          inputMode="decimal"
          onChange={handleValueChange}
          readOnly={!token || readonly}
        />
      )}

      <StyledErrorHint className={isInvalid ? 'error' : ''}>
        {t(errorHint)}
      </StyledErrorHint>
    </StyledZapControlContainer>
  );
};

interface TokenSelectProps {
  token: TokenLP;
  isDisabled: boolean;
  handleOpenSelectToken: () => void;
}

const TokenSelect: React.FC<TokenSelectProps> = ({
  token,
  isDisabled,
  handleOpenSelectToken,
}) => {
  return (
    <StyledTokenSymbol
      onClick={token && isDisabled ? () => {} : handleOpenSelectToken}
      className={!token ? 'error active' : token && isDisabled ? '' : 'active'}
    >
      <StyledTokenSymbolContainer className="token-name">
        {token ? (
          token.token0 && token.token1 ? (
            <StyledTokenSymbolContent>
              <StyledTokenSymbolLogo src={token.token0.logo} />{' '}
              {token.token0.name}
              <StyledPlus>+</StyledPlus>
              <StyledTokenSymbolLogo src={token.token1.logo} />{' '}
              {token.token1.name}
            </StyledTokenSymbolContent>
          ) : (
            <>
              {token && (
                <>
                  <StyledTokenSymbolContent>
                    <StyledTokenSymbolLogo src={token.logo} />
                    {token.name}
                  </StyledTokenSymbolContent>
                  {!isDisabled && <KeyboardArrowDownIcon />}
                </>
              )}
            </>
          )
        ) : (
          <>
            <StyledTokenSymbolContent>
              <Trans>Select a Token</Trans>
            </StyledTokenSymbolContent>
            <KeyboardArrowDownIcon />
          </>
        )}
      </StyledTokenSymbolContainer>
    </StyledTokenSymbol>
  );
};

const StyledZapControlContainer = styled.div`
  position: relative;
`;

const StyledWrapper = styled.div`
  padding: 8px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  justify-content: flex-end;
  align-items: flex-end;
  border-radius: 8px;
  background: #191d25;
  transition: 0.2s;
  border: 1px solid rgba(255, 255, 255, 0);
  &.error {
    border: 1px solid ${(props) => props.theme.color.red[900]};
  }
`;

const StyledErrorHint = styled.span`
  text-align: right;
  margin-top: 4px;
  color: ${(props) => props.theme.color.red[900]};
  font-size: 14px;
  transition: 0.3s;
  opacity: 0;
  position: absolute;
  bottom: -20px;
  right: 0px;
  &.error {
    opacity: 1;
  }
`;

const StypedTokenInput = styled.input`
  min-width: 0;
  width: 100%;
  flex: 1 1;
  margin: 0;
  margin-top: 8px;
  padding: 8px 20px;
  background: none;
  outline: none;
  border: 0;
  font-size: 28px;
  text-align: right;
  color: #fff;
  height: 100%;
  border-radius: 8px;

  padding-right: 8px;
  box-sizing: border-box;
  background: #191d25;
  border: 1px solid rgba(255, 255, 255, 0);
  box-sizing: border-box;
  &.error {
    border: 1px solid ${(props) => props.theme.color.red[900]};
  }
`;

const StyledReadOnlyValue = styled.div`
  padding: 6px 20px;
  background: none;
  font-size: 20px;
  color: #fff;
  padding-right: 8px;
  box-sizing: border-box;
  font-weight: 100;
`;

const StyledTokenSymbolLogo = styled.img`
  height: 24px;
  margin-right: 4px;
`;

const StyledTokenSymbolContainer = styled.div`
  color: ${(props) => props.theme.color.grey[300]};
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 8px;
  margin: 4px 0px;
  width: 100%;
`;

const StyledTokenSymbol = styled.div`
  border: 1px solid rgba(225, 225, 225, 0.1);
  border-radius: 8px;
  background: rgba(225, 225, 225, 0.1);
  display: flex;
  padding: 8px;
  box-sizing: border-box;

  width: 100%;

  &.active {
    cursor: pointer;
  }

  &.active:hover {
    background-color: rgba(38, 48, 65, 0.9);
  }

  &.error {
    background-color: ${(props) => props.theme.color.red[900]} !important;

    .token-name {
      color: white !important;
    }
  }
`;

const StyledTokenSymbolContent = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const StyledAvailableText = styled.div`
  font-size: 14px;
  line-height: 16px;
  height: 14px;
  color: ${(props) => props.theme.color.grey[300]};
  opacity: 0.6;
  transition: 0.2s;
  &.error {
    color: ${(props) => props.theme.color.red[900]};
    opacity: 1 !important;
  }
`;

const StyledAvailableTextClickable = styled(StyledAvailableText)`
  cursor: pointer;
  border-bottom: 1px dashed ${(props) => props.theme.color.grey[300]};
  &:hover {
    opacity: 1;
  }

  &.error {
    border-bottom: 1px dashed ${(props) => props.theme.color.red[900]};
  }
`;

const StyledLabelContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
  line-height: 19px;
  height: 19px;
`;

const StyledLabel = styled.div`
  flex: 1 1 0%;
  font-size: 16px;
  color: ${(props) => props.theme.color.grey[300]};
`;

const StyledPlus = styled.span`
  font-size: 18px;
  font-weight: 500;
  margin: 0 6px;
  margin-bottom: 4px;
`;
export default ZapTokenControl;
