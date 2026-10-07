import React from 'react';
import Modal, { ModalProps } from '../../Modal';
import chartLogo from './../../../assets/img/chart-icon.png';
import bscscanLogo from './../../../assets/img/bscscan-icon.png';
import nftLogo from './../../../assets/img/nav-nft.png';
import voteLogo from './../../../assets/img/vote-logo.svg';
import docsLogo from './../../../assets/img/docs-icon.png';
import convertLogo from './../../../assets/img/convert-icon.png';
import loterryLogo from './../../../assets/img/lottery-icon.png';
import analytics from '../../../modules/analytics';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import { Trans, useTranslation } from 'react-i18next';
import styled from 'styled-components';
import LanguageSelect from 'components/LanguageSelect';
import LanguageIcon from '@material-ui/icons/Language';
import { LANGUAGES } from 'constants/values';

const MobileUtilityModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const { i18n } = useTranslation();

  const selectedLanguage = LANGUAGES.find(
    (item) => item.code.toLowerCase() === i18n.language.toLocaleLowerCase()
  );

  return (
    <Modal onDismiss={onDismiss}>
      <StyledModalInner>
        <StyledNavItemContainer
          style={{ marginTop: 22 }}
          onClick={() => analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.NFT_CLICK)}
          href="/#/lottery"
        >
          <StyledItemImg src={loterryLogo} />
          <StyledItemContent>
            <Trans>Lottery</Trans>
          </StyledItemContent>
        </StyledNavItemContainer>

        <StyledNavItemContainer
          onClick={() => analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.NFT_CLICK)}
          href="/#/convert"
        >
          <StyledItemImg src={convertLogo} />
          <StyledItemContent>
            <Trans>Convert</Trans>
          </StyledItemContent>
        </StyledNavItemContainer>

        <StyledNavItemContainer
          onClick={() => analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.DAO_CLICK)}
          href="https://dao.hunny.finance"
          target="_blank"
        >
          <StyledItemImg src="https://dao.hunny.finance/logo192.png" />
          <StyledItemContent>
            <Trans>DAO</Trans>
          </StyledItemContent>
        </StyledNavItemContainer>

        <StyledNavItemContainer
          onClick={() => analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.PLAY_CLICK)}
          href="https://hunnyplay.io"
          target="_blank"
        >
          <StyledItemImg src="https://hunnyplay.io/logo-hunny-200.png" />
          <StyledItemContent>
            <Trans>Play</Trans>
          </StyledItemContent>
        </StyledNavItemContainer>

        <StyledNavItemContainer
          onClick={() =>
            analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.POKER_CLICK)
          }
          href="https://hunnypoker.com"
          target="_blank"
        >
          <StyledItemImg src="https://hunnyplay.io/logo-hunny-200.png" />
          <StyledItemContent>
            <Trans>Poker</Trans>
          </StyledItemContent>
        </StyledNavItemContainer>

        <StyledNavItemContainer
          onClick={() => analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.NFT_CLICK)}
          href="https://nft.hunny.finance"
          target="_blank"
        >
          <StyledItemImg src={nftLogo} />
          <StyledItemContent>
            <Trans>NFT</Trans>
          </StyledItemContent>
        </StyledNavItemContainer>

        <StyledNavItemContainer
          onClick={() => analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.VOTE_CLICK)}
          target="_blank"
          href="https://vote.hunny.finance/"
        >
          <StyledItemImg src={voteLogo} />
          <StyledItemContent>
            <Trans>Vote</Trans>
          </StyledItemContent>
        </StyledNavItemContainer>

        <StyledNavItemContainer
          onClick={() => analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.DOCS_CLICK)}
          target="_blank"
          href="https://docs.hunny.finance/"
        >
          <StyledItemImg src={docsLogo} />
          <StyledItemContent>
            <Trans>Docs</Trans>
          </StyledItemContent>
        </StyledNavItemContainer>

        <StyledItemContainer
          onClick={() =>
            analytics.sendEvent(
              GOOGLE_ANALYTIC_EVENTS.CLICK_VIEW_CHART_ON_MOBILE
            )
          }
          href="https://www.dextools.io/app/pancakeswap/pair-explorer/0x36118142f8c21a1f3fd806d4a34f56f51f33504f"
          target="_blank"
        >
          <StyledItemImg src={chartLogo} />
          <StyledItemContent>
            <Trans>View Chart</Trans>
          </StyledItemContent>
        </StyledItemContainer>

        <StyledItemContainer
          onClick={() =>
            analytics.sendEvent(
              GOOGLE_ANALYTIC_EVENTS.CLICK_VIEW_CONTRACT_ON_MOBILE
            )
          }
          href="https://bscscan.com/token/0x565b72163f17849832a692a3c5928cc502f46d69#balances"
          target="_blank"
        >
          <StyledItemImg src={bscscanLogo} />
          <StyledItemContent>
            <Trans>View Contract</Trans>
          </StyledItemContent>
        </StyledItemContainer>

        <StyledItemContainer>
          <LanguageSelect>
            <StyleSpaceBetweenContainer>
              <StyleLanguageSelectContent>
                <LanguageIcon
                  style={{ height: 24, width: 24, color: '#fff' }}
                />
                <StyledItemContent>
                  <Trans>Language</Trans>
                </StyledItemContent>
              </StyleLanguageSelectContent>
              <StyledItemContent>
                <img src={selectedLanguage?.logo} />
                {i18n.language.substring(0, 2).toUpperCase()}
              </StyledItemContent>
            </StyleSpaceBetweenContainer>
          </LanguageSelect>
        </StyledItemContainer>
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

const StyleLanguageSelectContent = styled.div`
  display: flex;
  align-items: center;
`;

const StyleSpaceBetweenContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const StyledItemContainer = styled.a`
  display: flex;
  align-items: center;
  justify-content: start;
  text-decoration: none;
  padding: 12px;
  margin-right: 12px;
`;

const StyledNavItemContainer = styled(StyledItemContainer)`
  display: none;

  @media (max-width: 550px) {
    display: flex;
  } ;
`;

const StyledNavItemContainerLink = styled.a`
  display: none;

  @media (max-width: 550px) {
    display: flex;
  } ;
`;

const StyledItemImg = styled.img`
  height: 24px;
`;

const StyledItemContent = styled.span`
  font-size: 16px;
  margin-left: 8px;
  color: ${(props) => props.theme.color.grey[100]};

  display: flex;
  align-items: center;
`;

export default MobileUtilityModal;
