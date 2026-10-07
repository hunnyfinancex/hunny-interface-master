import React from 'react';
import styled from 'styled-components';
import hunnyLogo from '../../../assets/img/hunny-logo.png';
import comingLabel from '../../../assets/img/coming-label.png';
import PersonIcon from '@material-ui/icons/Person';
import FavoriteIcon from '@material-ui/icons/Favorite';

export interface NFTCardProps{
  img: string,
  name: string
}

const NFTCard: React.FC<NFTCardProps> = ({img, name}) => {

  return (
    <StyledWrapper>
        <StyledContainerInner>
          <StyledImgContainer>
            <StyledNftImg src={img}/>
            <StyledBlur/>
          </StyledImgContainer>

          <StyledNftInfoContainer>
            <StyledNftInfoSection>
              <StyledNftName>
                {name}
              </StyledNftName>
              <StyledNftOwner>
                <PersonIcon/> HUNNY
              </StyledNftOwner>
              <StyledNftLoveCounter>
                <FavoriteIcon/> 0
              </StyledNftLoveCounter>
            </StyledNftInfoSection>

            <StyledNftPriceSection>
              <StyledHunnyCoinLogo
                className="hunny-coin-img"
                src={hunnyLogo}
                height="32"
              /> 
              <span style={{marginBottom: 5}}>Coming</span>
            </StyledNftPriceSection>
          </StyledNftInfoContainer>
          
          <StyledComingLabel src={comingLabel} />
        </StyledContainerInner>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Ubuntu';
`;

const StyledContainerInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 12px;
  box-sizing: border-box;

  background: #191D25;

  border: 1px solid #272F52;
  box-sizing: border-box;
  border-radius: 8px;

  transition: 0.3s;

  &:hover {
    border: 1px solid ${(props) => props.theme.color.purple[200]};
    background-position: 75%;
  }
`;

const StyledImgContainer = styled.div`
  width: 100%;
  position: relative;
`;

const StyledNftImg = styled.img`
  width: 100%;
  display: block; 
  border-radius: 5px;
`;

const StyledBlur = styled.div`
  background: linear-gradient(180deg, rgba(25, 29, 37, 0.5) 0%, #191D25 100%);
  border-radius: 5px;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  transition: 0.8s;

  :hover{
    opacity: 0;
  }
`;

const StyledNftInfoContainer = styled.div`
  display: flex;
`;

const StyledNftInfoSection = styled.div`
  flex-grow: 1;
`;

const StyledNftName = styled.div`
  font-weight: bold;
  color: white;
  margin-bottom: 12px;
  margin-top: 12px;
`

const StyledComingLabel = styled.img`
  position: absolute;
  height: 72px;
  top: -8px;
  left: -9px;
`;

const StyledNftOwner = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
  color: white;
  font-size: 12px;

  svg{ 
    width: 20px;
    color: white;
    margin-right: 6px;
  }
`
const StyledNftLoveCounter = styled(StyledNftOwner)`
`

const StyledNftPriceSection = styled.div`
  color: ${(props) => props.theme.color.purple[200]};
  align-items: flex-end;
  font-size: 16px;
  display: flex;
`

const StyledHunnyCoinLogo = styled.img`
`;

export default NFTCard;
