import React from 'react';
import styled from 'styled-components';
import chartLogo from './../../assets/img/chart-icon.png';
import bscscanLogo from './../../assets/img/bscscan-icon.png';
import HunnyTooltip from '../Tooltip';
import analytics from '../../modules/analytics';
import { GOOGLE_ANALYTIC_EVENTS } from '../../constants/gaEventTemplate';
import { useTranslation } from 'react-i18next';
import LanguageSelect from 'components/LanguageSelect';
import LanguageIcon from '@material-ui/icons/Language';
import { LANGUAGES } from 'constants/values';

const HunnyUtility: React.FC = () => {
  const { t, i18n } = useTranslation();

  const selectedLanguage = LANGUAGES.find(
    (item) => item.code.toLowerCase() === i18n.language.toLocaleLowerCase()
  );

  return (
    <StyledWrapper>
      <StyledItemContainer
        onClick={() =>
          analytics.sendEvent(
            GOOGLE_ANALYTIC_EVENTS.CLICK_VIEW_CHART_ON_DESKTOP
          )
        }
        href="https://www.dextools.io/app/pancakeswap/pair-explorer/0x36118142f8c21a1f3fd806d4a34f56f51f33504f"
        target="_blank"
        data-for={`utility-tooltip`}
        data-tip={t(`View Chart`)}
      >
        <StyledItemImg src={chartLogo} />
      </StyledItemContainer>

      <StyledItemContainer
        onClick={() =>
          analytics.sendEvent(
            GOOGLE_ANALYTIC_EVENTS.CLICK_VIEW_CONTRACT_ON_DESKTOP
          )
        }
        href="https://bscscan.com/token/0x565b72163f17849832a692a3c5928cc502f46d69#balances"
        target="_blank"
        data-for={`utility-tooltip`}
        data-tip={t(`View Contract`)}
      >
        <StyledItemImg src={bscscanLogo} />
      </StyledItemContainer>

      <StyledLanguageSelectContainer>
        <StyledItemContainer>
          <LanguageSelect>
            <img
              src={selectedLanguage?.logo}
              data-for={`utility-tooltip`}
              data-tip={`${t(`Language`)}: ${i18n.language
                .substring(0, 2)
                .toUpperCase()}`}
              style={{
                color: '#fff',
                cursor: 'pointer',
                width: 24,
                height: 24,
              }}
            />
          </LanguageSelect>
        </StyledItemContainer>
      </StyledLanguageSelectContainer>

      <HunnyTooltip id={`utility-tooltip`} place="left" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  background-color: #020c20;
  top: 120px;
  right: 10px;
  border: 1px solid #272f52;
  box-sizing: border-box;
  border-radius: 5px;
  opacity: 0.9;
  z-index: 2;

  &:hover {
    opacity: 1;
  }
`;

const StyledItemContainer = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 12px;
  box-sizing: border-box;

  @media (max-width: 1023px) {
    display: none;
  } ;
}
`;

const StyledLanguageSelectContainer = styled.div`
  display: none;

  @media (max-width: 1330px) {
    display: flex;
  } ;
`;

const StyledItemImg = styled.img``;

export default HunnyUtility;
