import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import UnlockButton from '../../../components/UnlockButton';
import { SubmitTypeEnum } from '../../../modules/enums/PoolDetails.enum';

interface PoolActionProps {
  actionType: SubmitTypeEnum;
  onDeposited: (...params: any) => void;
  onApproved: (...params: any) => void;
  onWithdraw: (...params: any) => void;
  onClaimAndWithdrawAll: (...params: any) => void;
  isPending?: boolean;
  isDisabled?: boolean;
  isExitDisabled?: boolean;
  isOnlyClaimAndWithdraw?: boolean;
  isVesting?: boolean;

  // work around to disable approve
  isDisabledAll?: boolean;
}

const PoolAction: React.FC<PoolActionProps> = ({
  actionType,
  onDeposited,
  onApproved,
  onWithdraw,
  onClaimAndWithdrawAll,
  isPending,
  isDisabled,
  // work around to disable approve
  isDisabledAll,
  isOnlyClaimAndWithdraw,
  isExitDisabled,
  isVesting,
}) => {
  const { account } = useWallet();
  const { t } = useTranslation();
  return (
    <StyledContainer>
      {account ? (
        <>
          {actionType == SubmitTypeEnum.Approve ? (
            <StyledSubmitButton
              disabled={isPending || isDisabledAll || !onApproved}
              onClick={onApproved}
            >
              {isPending ? <StyledProgress size={18} /> : null}
              <Trans>Approve</Trans>
            </StyledSubmitButton>
          ) : null}

          {actionType == SubmitTypeEnum.Deposit ? (
            <StyledSubmitButton
              disabled={
                isPending || isDisabledAll || isDisabled || !onDeposited
              }
              onClick={onDeposited}
            >
              {isPending ? <StyledProgress size={18} /> : null}
              <Trans i18nKey="deposit_btn">Deposit</Trans>
            </StyledSubmitButton>
          ) : null}

          {!isOnlyClaimAndWithdraw && actionType == SubmitTypeEnum.WithDraw ? (
            <StyledSubmitButton
              disabled={isPending || isDisabledAll || isDisabled}
              onClick={onWithdraw}
            >
              {isPending ? <StyledProgress size={18} /> : null}
              <Trans>Withdraw</Trans>
            </StyledSubmitButton>
          ) : null}

          {actionType === SubmitTypeEnum.WithDraw ? (
            <ClaimAndWithdrawButton
              disabled={isPending || isExitDisabled}
              onClick={onClaimAndWithdrawAll}
            >
              {isPending ? <StyledProgress size={18} /> : null}
              {isVesting ? (
                <>Exit: Harvest and withdraw</>
              ) : (
                <Trans>Exit Claim and withdraw</Trans>
              )}
            </ClaimAndWithdrawButton>
          ) : null}
        </>
      ) : (
        <UnlockButton />
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  margin: ${(props) => props.theme.spacing[4]}px 0px
    ${(props) => props.theme.spacing[1]}px 0px;
`;

const StyledSubmitButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
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
  text-align: center;
  opacity: 0.9;
  margin-top: 12px;

  &:disabled {
    background-color: ${(props) => props.theme.color.purple[900]};
    color: ${(props) => props.theme.color.grey[300]};
    opacity: 1 !important;
    cursor: default;
  }

  &:hover {
    opacity: 1;
  }
`;

const ClaimAndWithdrawButton = styled(StyledSubmitButton)`
  background-color: rgba(255, 255, 255, 1);
  color: ${(props) => props.theme.color.purple[100]};

  &:disabled {
    background-color: #393b47;
    color: ${(props) => props.theme.color.grey[300]};
  }
`;

const StyledProgress = styled(CircularProgress)`
  color: #fff !important;
  margin-right: 4px;
`;

export default PoolAction;
