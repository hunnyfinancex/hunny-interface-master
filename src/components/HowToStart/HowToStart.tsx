import React, { useState } from 'react';
import styled from 'styled-components';
import chartLogo from './../../assets/img/how-to-start.gif';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from 'constants/values';
import CancelIcon from '@material-ui/icons/Cancel';

const HowToStart: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [isHide, setIsHide] = useState(
    localStorage.getItem('isHideHowToStart')
  );

  const selectedLanguage = LANGUAGES.find(
    (item) => item.code.toLowerCase() === i18n.language.toLocaleLowerCase()
  );

  const handleHide = () => {
    setIsHide('hide');
    localStorage.setItem('isHideHowToStart', 'hide');
  };

  return !isHide ? (
    <StyledWrapper>
      <StyledContainer>
        <StyledCancelIcon onClick={handleHide} />
        <a
          target="_blank"
          href={
            selectedLanguage.code.includes('zh')
              ? 'https://docs.hunny.finance/v/jian-ti-zhong-wen/how-to-guides/xin-shou-ru-men-shi-pin-zhi-nan'
              : 'https://docs.hunny.finance/how-to-guides/getting-started-video-guide'
          }
        >
          <StyledItemImg src={chartLogo} />
        </a>
      </StyledContainer>
    </StyledWrapper>
  ) : null;
};

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 64px;
  right: 10px;
  box-sizing: border-box;
  opacity: 0.9;
  z-index: 2;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const StyledContainer = styled.div`
  position: relative;
`;

const StyledItemImg = styled.img``;

const StyledCancelIcon = styled(CancelIcon)`
  color: #a8a9ac;
  position: absolute;
  top: -22px;
  right: 0px;
`;

export default HowToStart;
