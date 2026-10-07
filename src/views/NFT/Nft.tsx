import React from 'react';
import styled from 'styled-components';
import Container from '../../components/Container';
import headerImg from '../../assets/img/nft_banner.png';
import headerImgMobile from '../../assets/img/nft_banner_mobile.png';
import NFTCard from './Components/NftCard';

import nftImg1 from '../../assets/img/nft-img-1.png';
import nftImg2 from '../../assets/img/nft-img-2.png';
import nftImg3 from '../../assets/img/nft-img-3.png';
import nftImg4 from '../../assets/img/nft-img-4.png';
import Countdown from 'views/PreSale/components/Countdown';

const NFT_IMAGES = [
  {
    id: 1,
    img: nftImg1,
    name: 'Eve'
  },
  {
    id: 2,
    img: nftImg2,
    name: 'Sabrina'
  },
  {
    id: 3,
    img: nftImg3,
    name: 'Xunin'
  },
  {
    id: 4,
    img: nftImg4,
    name: 'Tomiko'
  }
]

const NFT: React.FC = () => {
  return (
    <StyledWrapper>
      <StyledContainer>
        <StyledContainerInner>
          <Countdown endDate={new Date('10/25/2021 08:00:00')} label="MARKETPLACE WILL OPEN IN" />
          <StyledHeaderImage src={headerImg} />
          <StyledHeaderImageMobile src={headerImgMobile} />

          <StyledNftSectionTitle>
            Upcoming
          </StyledNftSectionTitle>

          <StyledNftCardContainer>
            {
              NFT_IMAGES.map(item => (
                <StyledNftCard key={item.id}>
                  <NFTCard img={item.img} name={item.name}/>
                </StyledNftCard>
              ))
            }
          </StyledNftCardContainer>
        </StyledContainerInner>
      </StyledContainer>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Ubuntu';
`;

const StyledContainer = styled.div`
  max-width: 1050px;
  width: 100%;
  height: 100%;
`;

const StyledContainerInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 12px;
  box-sizing: border-box;
  padding-bottom: 64px;
  margin-top: 40px;
`;

const StyledHeaderImage = styled.img`
  margin: 64px 0px;
  width: 100%;
  display: block; 
  
  @media (max-width: 425px) {
    display: none;
  } ;
`;

const StyledHeaderImageMobile = styled.img`
  margin: 64px 0px;
  width: 100%;
  display: none;

  @media (max-width: 425px) {
    display: block;
  } ;
`;

const StyledNftSectionTitle = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;

  color: ${(props) => props.theme.color.yellow[100]};
`;

const StyledNftCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledNftCard = styled.div`
  flex-grow: 1;
  width: 25%;
  box-sizing: border-box;
  padding: 8px;

  @media (max-width: 768px) {
    flex-grow: 1;
    width: 50%;
  };

  @media (max-width: 425px) {
    flex-grow: 1;
    width: 100%;
  };
`;




export default NFT;
