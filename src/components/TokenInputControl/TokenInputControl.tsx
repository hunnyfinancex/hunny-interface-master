import BigNumber from 'bignumber.js';
import React, { useCallback, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { GOOGLE_ANALYTIC_EVENTS } from '../../constants/gaEventTemplate';
import analytics from '../../modules/analytics';
import { TokenDisplay } from '../../modules/models/tokenDisplay.model';
import { toTokenUnitsBN } from '../../modules/number';
import NumberDisplay from '../NumberDisplay';

export interface TokenInputControlProps {
  token: TokenDisplay;
  value: string;
  balance: BigNumber;
  maxBalance: BigNumber;
  onChange: (value: string) => void;
  readOnly?: boolean;
  balanceLabel?: string;
  maxErrorInputMsg?: string;
  hasDeposit?: boolean;

  setError?: (value: string) => void;
}

const TokenInputControl: React.FC<TokenInputControlProps> = ({
  token,
  value,
  balance,
  maxBalance,
  readOnly,
  maxErrorInputMsg = 'Insufficient balance',
  balanceLabel = ' Wallet Balance',
  onChange,
  setError,
  hasDeposit,
}) => {
  const [errorHint, setErrorHint] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    validation(value);
  }, [onChange]);

  const fillMaxBalance = () => {
    analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.CLICK_MAX_BUTTON_ON_TOKEN_INPUT);
    const maxValue = toTokenUnitsBN(maxBalance, 18);
    onChange(
      token.name === 'BNB' && hasDeposit
        ? maxValue.gt(0.005)
          ? maxValue.minus(0.005).toString()
          : '0'
        : maxValue.toString()
    );
    resetErr();
  };

  const handleValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(',', '.');
      value = value === '-' ? '' : value;
      const currentValue = Number(value); // some mobile device keyboard show comma instead of dot
      if (!currentValue && currentValue !== 0) {
        return;
      }

      const parts = value.split('.');
      if (parts[1] && parts[1].length > 18) {
        return;
      }

      validation(value);

      onChange(value);
    },
    [onChange, maxBalance, setError]
  );

  const validation = (value: string) => {
    const parsedValue = new BigNumber(value);
    const maxValue = toTokenUnitsBN(maxBalance, 18);
    const minValue = 0;

    if (maxValue.lt(parsedValue)) {
      const msg = maxErrorInputMsg;
      if (errorHint !== msg) {
        analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.ERROR_TOKEN_INPUT, msg);
      }
      setErrorHint(msg);
      setIsInvalid(true);
      if (setError) {
        setError(msg);
      }
    } else if (parsedValue.lt(minValue)) {
      const msg = 'Insufficient balance';
      if (errorHint !== msg) {
        analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.ERROR_TOKEN_INPUT, msg);
      }

      setErrorHint(msg);
      setIsInvalid(true);
      if (setError) {
        setError(msg);
      }
    } else {
      resetErr();
    }
  };

  const resetErr = () => {
    setErrorHint('');
    setIsInvalid(false);
    if (setError) {
      setError('');
    }
  };

  return (
    <StyledTokenControlContainer>
      <StyledBalance className={isInvalid ? 'error' : ''}>
        {t(balanceLabel)}: <NumberDisplay value={balance} fixed={3} />
        {` ${token.name}`}
      </StyledBalance>
      <StyledWrapper className={isInvalid ? 'error' : ''}>
        <StypedTokenInput
          inputMode="decimal"
          value={value}
          placeholder="0"
          onChange={readOnly ? (e) => {} : handleValueChange}
          readOnly={readOnly}
        />
        <StyledTokenSymbol>{token.name}</StyledTokenSymbol>
        <StyledTokenSymbolMobile>{token.shortName}</StyledTokenSymbolMobile>
        {!readOnly ? (
          <StyledMaxBtn onClick={fillMaxBalance}>
            <Trans>MAX</Trans>
          </StyledMaxBtn>
        ) : null}
      </StyledWrapper>
      <StyledErrorHint className={isInvalid ? 'error' : ''}>
        {t(errorHint)}
      </StyledErrorHint>
    </StyledTokenControlContainer>
  );
};

const StyledTokenControlContainer = styled.div`
  position: relative;
`;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  padding-right: 8px;
  background-color: ${(props) => props.theme.inputBackground};
  height: 46px;
  border: 1px solid rgba(255, 255, 255, 0);
  box-sizing: content-box;

  &.error {
    margin-bottom: 25px;
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
  padding: 6px 20px;
  background: none;
  outline: none;
  border: 0;
  font-size: 24px;
  text-align: right;
  color: #fff;
`;

const StyledBalance = styled.div`
  margin-top: ${(props) => props.theme.spacing[4]}px;
  margin-bottom: ${(props) => props.theme.spacing[1]}px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: right;
  color: ${(props) => props.theme.color.grey[200]};

  &.error {
    color: ${(props) => props.theme.color.red[900]};
  }
`;

const StyledTokenSymbol = styled.span`
  display: inline-block;
  color: ${(props) => props.theme.color.grey[400]};
  max-width: 35%;
  font-size: 16px;
  text-align: right;

  @media (max-width: 480px) {
    display: none;
  } ;
`;

const StyledTokenSymbolMobile = styled(StyledTokenSymbol)`
  display: none;

  @media (max-width: 480px) {
    font-size: 14px;
    display: inline-block;
  } ;
`;

const StyledMaxBtn = styled.button`
  outline: none;
  border: 0;
  border-radius: 5px;
  cursor: pointer;

  padding: 8px 8px;

  background-color: rgba(221, 104, 172, 0.2);
  color: #fff;

  font-size: 14px;
  letter-spacing: 0.5px;
  margin: 0 8px 0 20px;

  :hover {
    background-color: rgba(221, 104, 172, 0.3);
  }
`;

export default TokenInputControl;
