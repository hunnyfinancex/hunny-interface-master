import React, { useCallback, useState } from 'react';
import Modal, { ModalProps } from '../../Modal';
import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import IconButton from '@material-ui/core/IconButton';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import FilterNoneOutlinedIcon from '@material-ui/icons/FilterNoneOutlined';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import analytics from '../../../modules/analytics';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import { Trans, useTranslation } from 'react-i18next';

const MyWalletModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const [copy, setCopy] = useState(false);
  const { account, reset } = useWallet();

  const { t } = useTranslation();

  const handleClickAddress = () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_VIEW_ON_BSC_SCAN_YOUR_WALLET_MODAL
    );
    window.open(`https://bscscan.com/address/${account}`);
  };

  const handleCopyAddress = () => {
    analytics.sendEvent(
      GOOGLE_ANALYTIC_EVENTS.CLICK_COPY_ADDRESS_YOUR_WALLET_MODAL
    );
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  const handleLogout = useCallback(() => {
    analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.CLICK_LOGOUT_YOUR_WALLET_MODAL);

    onDismiss!();
    reset();
    window.localStorage.removeItem('walletConnect');
  }, [onDismiss, reset]);

  return (
    <Modal onDismiss={onDismiss}>
      <StyledModalInner>
        <StyledModalTitle>
          <Trans>Your wallet</Trans>
        </StyledModalTitle>
        <StyledAddress>{account}</StyledAddress>
        <StyledRowLink>
          <StyledLink>
            <Trans>View on BscScan</Trans>
          </StyledLink>
          <StyledLinkIcon onClick={handleClickAddress}>
            <IconButton style={{ color: '#F3C622' }}>
              <OpenInNewIcon style={{ fontSize: 14, fontWeight: 500 }} />
            </IconButton>
          </StyledLinkIcon>
          <StyledSpacer />
          <StyledLink>{copy ? t(`Copied!`) : t(`Copy Address`)}</StyledLink>
          <CopyToClipboard text={account} onCopy={() => setCopy(true)}>
            <StyledLinkIcon onClick={handleCopyAddress}>
              <IconButton style={{ color: '#F3C622' }}>
                <FilterNoneOutlinedIcon
                  style={{ fontSize: 14, fontWeight: 500 }}
                />
              </IconButton>
            </StyledLinkIcon>
          </CopyToClipboard>
        </StyledRowLink>
        <StyledWrapper>
          <StyledLogoutBtn onClick={handleLogout}>
            <Trans>Logout</Trans>
          </StyledLogoutBtn>
        </StyledWrapper>
      </StyledModalInner>
    </Modal>
  );
};

const StyledModalInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 0px;
  max-height: 480px;
`;

const StyledModalTitle = styled.div`
  color: ${(props) => props.theme.color.grey[300]};
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: normal;
  @media (max-width: 425px) {
    margin-left: 12px;
  }
`;

const StyledAddress = styled.div`
  color: ${(props) => props.theme.color.grey[300]};
  font-size: 18px;
  font-weight: bold;
  @media (max-width: 425px) {
    margin-left: 12px;
    margin-right: 12px;
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
    max-width: 425px;
  }

  @media (max-width: 320px) {
    font-size: 12px;
    max-width: 320px;
  }
`;

const StyledRowLink = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: normal;
  margin-top: 6px;
  @media (max-width: 425px) {
    margin-left: 12px;
  }
`;

const StyledLink = styled.div`
  color: ${(props) => props.theme.color.yellow[100]};
  font-size: 14px;
  font-weight: normal;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLinkIcon = styled.div`
  display: flex;
`;

const StyledSpacer = styled.div`
  width: 26px;
`;

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const StyledLogoutBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: ${(props) => props.theme.color.purple[100]};
  outline: none;
  border: 0;
  cursor: pointer;
  margin-top: 20px;
  padding: 12px 36px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
`;

export default MyWalletModal;
