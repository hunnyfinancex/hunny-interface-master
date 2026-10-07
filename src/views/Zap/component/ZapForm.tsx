import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import ZapTokenControl from './ZapTokenControl';
import { useWallet } from 'use-wallet';
import UnlockButton from '../../../components/UnlockButton';
import { getAddress } from '../../../modules/utils';
import { HUNNY_ZAP } from '../../../constants/contracts';
import { approve } from '../../../modules/web3';
import useExecute from '../../../hooks/useExecute';
import { useGetTokenAllowance } from '../../../hooks/useZap';
import { getLPAmountsOut, zapTokens } from '../../../modules/zap';
import { TOKENS_ZAP } from '../../../constants/tokens';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';
import { useAppDispatch } from '../../../state';
import { updateTab } from '../../../state/zap';
import { ZapTabEnum } from '../../../modules/enums/Zap.enum';
import { CircularProgress } from '@material-ui/core';
import { useEstimateReceiveValue } from '../../../hooks/Zap/useEstimateReceiveValue';
import NumberDisplay from '../../../components/NumberDisplay';
import BigNumber from 'bignumber.js';
import { delineate, toTokenUnitsBN } from '../../../modules/number';
import SettingsIcon from '@material-ui/icons/Settings';
import { IconButton } from '@material-ui/core';
import { Trans, useTranslation } from 'react-i18next';

const ZapForm: React.FC = () => {
  const SLIPPAGE = localStorage.getItem('slippage');
  const SLIPPAGE_INPUT = localStorage.getItem('slippage_input');

  const { t } = useTranslation();

  const { ethereum, account } = useWallet();

  const dispatch = useAppDispatch();

  const payToken = useSelector((state: State) => state.zap.payToken);

  const receiveToken = useSelector((state: State) => state.zap.receiveToken);

  const { convertRate } = useEstimateReceiveValue();

  const allowance = useGetTokenAllowance(
    payToken,
    account,
    getAddress(HUNNY_ZAP)
  );

  const { isPending, executeRequest } = useExecute();

  const [payValue, setPayValue] = useState('');
  const [isOpenSlippage, setIsOpenSlippage] = useState(false);
  const [receiveValue, setReceiveValue] = useState('0');
  const [formError, setFormError] = useState('');
  const [slippage, setSlippage] = useState(SLIPPAGE || '3');
  const [customSlippageValue, setCustomSlippageValue] = useState(
    SLIPPAGE_INPUT || ''
  );

  const [typingTimeout, settypingTimeout] = useState(null);
  const [estimatedRemoveLp, setEstimatedRemoveLp] = useState(null);

  useEffect(() => {
    handleChangeValue(payValue);
  }, [convertRate]);

  useEffect(() => {
    if (
      payToken &&
      receiveToken &&
      payToken.name === receiveToken.name &&
      Number(payValue)
    ) {
      handleChangeValue(payValue);
    } else {
      setEstimatedRemoveLp(null);
    }
  }, [payToken, receiveToken]);

  const handleChangeValue = useCallback(
    (value: string) => {
      setPayValue(value);

      if (payToken.name === receiveToken.name && Number(value)) {
        if (typingTimeout) {
          clearTimeout(typingTimeout);
        }

        settypingTimeout(
          setTimeout(async () => {
            const result = await getLPAmountsOut(value, payToken);
            setEstimatedRemoveLp([
              toTokenUnitsBN(result[0], receiveToken.token0.decimals),
              toTokenUnitsBN(result[1], receiveToken.token1.decimals),
            ]);
          }, 500)
        );

        setReceiveValue(null);
        return;
      }

      if (!convertRate) {
        setReceiveValue(null);
        return;
      }

      const parsedValue = new BigNumber(value);

      if (parsedValue.gt(0)) {
        const receiveValue = parsedValue.multipliedBy(convertRate);
        setReceiveValue(
          delineate(receiveValue.toString(10), 6).replaceAll(',', '')
        );
      } else {
        setReceiveValue('0');
      }
    },
    [convertRate, payToken, receiveToken]
  );

  const handleOpenSelectPayTokenList = useCallback(() => {
    dispatch(updateTab(ZapTabEnum.PayTokenList));
  }, []);

  const handleOpenSelectReceiveTokenList = useCallback(() => {
    dispatch(updateTab(ZapTabEnum.ReceiveTokenList));
  }, []);

  const handleApprove = useCallback(async () => {
    if (ethereum && account) {
      executeRequest(
        approve(ethereum, payToken.addresses, account, getAddress(HUNNY_ZAP))
      );
    }
  }, [ethereum, account, payToken]);

  const handleZapToken = useCallback(async () => {
    if (ethereum && account) {
      setPayValue('');
      executeRequest(
        zapTokens(ethereum, account, payToken, payValue, receiveToken, slippage)
      );
    }
  }, [ethereum, account, payToken, payValue, receiveToken]);

  const updateSlippage = (value: string) => {
    localStorage.setItem('slippage', value);
    setSlippage(value);
  };

  const handleCustomSlippageValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(',', '.').trim();
      const currentValue = Number(value); // some mobile device keyboard show comma instead of dot

      if ((!currentValue && currentValue !== 0) || currentValue < 0) {
        return;
      }

      const parts = value.split('.');
      if (parts[1] && parts[1].length > 2) {
        return;
      }

      localStorage.setItem('slippage_input', value);
      setCustomSlippageValue(value);
      updateSlippage(value || slippage);
    },
    [setCustomSlippageValue]
  );

  return (
    <StyledContainer>
      <ZapTokenControl
        token={payToken}
        label={t('Pay')}
        value={payValue}
        setError={setFormError}
        onChange={handleChangeValue}
        openSelectToken={handleOpenSelectPayTokenList}
      />

      <StyledArrowDownwardIcon />

      <ZapTokenControl
        token={receiveToken}
        label={
          receiveValue != null || estimatedRemoveLp
            ? t('Receive (Estimated)')
            : t('Receive')
        }
        value={receiveValue}
        openSelectToken={handleOpenSelectReceiveTokenList}
        readonly
      />
      {convertRate && payToken && receiveToken && (
        <StyledConversionRate>
          <StyledConversionRateLabel>
            <Trans>Price</Trans>
          </StyledConversionRateLabel>
          <StyledConversionRateValue>
            1 {payToken.name} ={' '}
            <NumberDisplay value={convertRate} fixed={6} decimals={0} />{' '}
            {receiveToken.name}
          </StyledConversionRateValue>
        </StyledConversionRate>
      )}

      {payToken?.name === receiveToken?.name && estimatedRemoveLp && (
        <StyledEstimatedLP>
          <StyledEstimatedLPValue>
            <NumberDisplay
              value={estimatedRemoveLp[0]}
              fixed={6}
              decimals={0}
            />{' '}
            {receiveToken.token0.name}
          </StyledEstimatedLPValue>
          <span style={{ margin: '0px 12px' }}>+</span>
          <StyledEstimatedLPValue>
            <NumberDisplay
              value={estimatedRemoveLp[1]}
              fixed={6}
              decimals={0}
            />{' '}
            {receiveToken.token1.name}
          </StyledEstimatedLPValue>
        </StyledEstimatedLP>
      )}

      {payToken?.name !== receiveToken?.name ? (
        <>
          <StyledSectionTitle>
            <Trans>Slippage Tolerance</Trans>
            <StyledSlippageDisplay>
              <strong
                style={{ opacity: isOpenSlippage ? 0 : 1, transition: '0.3s' }}
              >
                {slippage}%
              </strong>{' '}
              <IconButton
                onClick={() => {
                  setIsOpenSlippage(!isOpenSlippage);
                }}
              >
                <SettingsIcon />
              </IconButton>
            </StyledSlippageDisplay>
          </StyledSectionTitle>

          <StyledSlippageContainer className={isOpenSlippage ? 'active' : ''}>
            <StyledSlippage
              onClick={() => updateSlippage('0.5')}
              className={slippage == '0.5' && 'active'}
            >
              0.5%
            </StyledSlippage>
            <StyledSlippage
              onClick={() => updateSlippage('1')}
              className={slippage == '1' && 'active'}
            >
              1%
            </StyledSlippage>
            <StyledSlippage
              onClick={() => updateSlippage('3')}
              className={slippage == '3' && 'active'}
            >
              3%
            </StyledSlippage>
            <StyledSlippage
              onClick={() => updateSlippage(customSlippageValue || slippage)}
              className={
                slippage == customSlippageValue &&
                customSlippageValue != '0.5' &&
                customSlippageValue != '1' &&
                customSlippageValue != '3' &&
                'active'
              }
            >
              <StyledSlippageInput
                inputMode="numeric"
                value={customSlippageValue}
                onChange={handleCustomSlippageValueChange}
              />
              <StyledPercent>%</StyledPercent>
            </StyledSlippage>
          </StyledSlippageContainer>
        </>
      ) : (
        <div style={{ height: 48 }}></div>
      )}

      <StyledButtonContainer>
        {account ? (
          <>
            {(allowance && allowance.gt(0)) ||
            (payToken && payToken.name === TOKENS_ZAP.BNB.name) ? (
              <StyledSubmitButton
                onClick={handleZapToken}
                disabled={
                  !payToken ||
                  !receiveToken ||
                  !payValue ||
                  !!formError ||
                  isPending
                }
              >
                {isPending ? <StyledProgress size={16} /> : null}
                {payToken &&
                payToken.name === TOKENS_ZAP.BNB.name &&
                receiveToken &&
                receiveToken.name === TOKENS_ZAP.WBNB.name ? (
                  t(`Wrap`)
                ) : (
                  <>
                    {payToken &&
                    payToken.name === TOKENS_ZAP.WBNB.name &&
                    receiveToken &&
                    receiveToken.name === TOKENS_ZAP.BNB.name
                      ? t(`Unwrap`)
                      : t(`Convert`)}
                  </>
                )}
              </StyledSubmitButton>
            ) : (
              <StyledSubmitButton
                onClick={handleApprove}
                disabled={
                  !payToken ||
                  !receiveToken ||
                  !payValue ||
                  !!formError ||
                  isPending
                }
              >
                {isPending ? <StyledProgress size={18} /> : null}
                <Trans>Approve</Trans>
              </StyledSubmitButton>
            )}
          </>
        ) : (
          <UnlockButton />
        )}
      </StyledButtonContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 12px;
`;

const StyledSectionTitle = styled.div`
  flex: 1 1 0%;
  font-size: 14px;
  color: ${(props) => props.theme.color.grey[300]};
  margin-top: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    color: ${(props) => props.theme.color.grey[300]} !important;
  }
`;

const StyledSlippageContainer = styled.div`
  display: flex;
  margin: 12px 0px;
  height: 0px !important;
  overflow: hidden;
  transition: 0.3s;

  &.active {
    height: 30px !important;
  }
`;

const StyledSlippageDisplay = styled.div`
  display: flex;
  align-items: center;

  transition: 0.3s;
`;

const StyledSlippage = styled.div`
  user-select: none;
  border-radius: 5px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 10px;
  background-color: rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.color.grey[300]};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  flex-grow: 1;
  width: 64px;
  overflow: hidden;
  position: relative;
  opacity: 0.6;

  &.active {
    background-color: rgba(233, 96, 175, 0.6);
    opacity: 1;
  }
`;

const StyledSlippageInput = styled.input`
  background: transparent;
  outline: none;
  border: none;
  width: 100%;
  height: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  background-color: rgba(0, 0, 0, 0.2);
  color: ${(props) => props.theme.color.grey[300]};
  width: 100%;
  padding-right: 18px;
  box-sizing: border-box;
`;

const StyledPercent = styled.div`
  pointer-events: none;

  width: 18px;
  position: absolute;
  right: 0;
`;

const StyledConversionRate = styled.div`
  line-height: 24px;
  color: ${(props) => props.theme.color.grey[300]};
  display: flex;
  margin-top: 24px;
  font-size: 14px;
  align-items: center;
`;

const StyledConversionRateValue = styled.div`
  font-weight: bold;
  font-size: 14px;
  color: ${(props) => props.theme.color.purple[200]};
`;

const StyledEstimatedLP = styled.div`
  line-height: 24px;
  color: ${(props) => props.theme.color.grey[300]};
  display: flex;
  margin-top: 12px;
  align-items: center;
  justify-content: flex-end;
`;

const StyledEstimatedLPValue = styled.div`
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: flex-end;
`;

const StyledConversionRateLabel = styled(StyledConversionRateValue)`
  flex-grow: 1;
`;

const StyledWarningText = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;

  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: ${(props) => props.theme.color.grey[400]};
  box-sizing: border-box;

  position: relative;
`;

const StyledButtonContainer = styled.div`
  margin-bottom: 24px;
`;

const StyledArrowDownwardIcon = styled(ArrowDownwardIcon)`
  font-size: 22px !important;
  font-weight: bold;
  align-self: center;
  color: ${(props) => props.theme.color.grey[300]};
  margin: 16px 0px 4px 0px;
`;

const StyledSyncAltIcon = styled(SyncAltIcon)`
  font-size: 16px !important;
  color: ${(props) => props.theme.color.grey[300]};
`;

const StyledSubmitButton = styled.button`
  background-color: ${(props) => props.theme.color.purple[100]};
  outline: none;
  border: 0;
  border-radius: 5px;
  cursor: pointer;
  height: 46px;
  line-height: 46px;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  opacity: 0.9;

  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    opacity: 1;
  }

  &:disabled {
    background-color: ${(props) => props.theme.color.purple[900]};
    color: ${(props) => props.theme.color.grey[300]};
    opacity: 1 !important;
    cursor: default;
  }
`;

const StyledProgress = styled(CircularProgress)`
  color: #fff !important;
  margin-right: 4px;
`;

export default ZapForm;
