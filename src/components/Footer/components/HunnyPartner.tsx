import React from 'react';
import styled from 'styled-components';
import { getI18n } from 'react-i18next';
import { Grid } from '@material-ui/core';
import { GOOGLE_ANALYTIC_EVENTS } from '../../../constants/gaEventTemplate';
import analytics from '../../../modules/analytics';
import tokenPocketImg from '../../../assets/img/tokenpocket.png';
import coinmarketcapImg from '../../../assets/img/coinmarketcap.png';
import coingeckoImg from '../../../assets/img/coingecko.png';
import dappradarImg from '../../../assets/img/dappradar.png';
import chainlinkImg from '../../../assets/img/chainlink.svg';
import dappImg from '../../../assets/img/dapp.com.png';
import DefillamaImg from 'assets/img/defillama.png';
import NomicsImg from 'assets/img/nomics.png';
import KingDataImg from 'assets/img/king-data.png';
import DeBankImg from 'assets/img/debank.png';

const HunnyPartner: React.FC = () => {
  const languages = getI18n()?.languages || [];
  return (
    <StyledNav>
      <Grid container spacing={2} style={{ justifyContent: 'center' }}>
        <Grid item xs={6} sm={6} md={4} lg={2}>
          <StyledLink
            onClick={() =>
              analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.FOOTER_COINMARKETCAP_CLICK)
            }
            target="_blank"
            href="https://coinmarketcap.com/currencies/pancake-hunny/"
          >
            <StyledPartnerImg style={{ minHeight: 23 }} src={coinmarketcapImg} />
          </StyledLink>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={2}>
          <StyledLink
            onClick={() =>
              analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.FOOTER_COINGECKO_CLICK)
            }
            target="_blank"
            href="https://www.coingecko.com/en/coins/pancake-hunny"
          >
            <StyledPartnerImg src={coingeckoImg} />
          </StyledLink>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={2}>
          <StyledLink
            onClick={() =>
              analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.FOOTER_DAPPRADAR_CLICK)
            }
            target="_blank"
            href="https://dappradar.com/binance-smart-chain/defi/pancake-hunny"
          >
            <StyledPartnerImg src={dappradarImg} />
          </StyledLink>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={2}>
        <StyledLink
          onClick={() =>
            analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.FOOTER_TOKENPOCKET_CLICK)
          }
        >
          <StyledPartnerImg src={tokenPocketImg} />
        </StyledLink>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={2}>
          <StyledLink
            onClick={() =>
              analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.FOOTER_DAPP_CLICK)
            }
            target="_blank"
            href="https://www.dapp.com/app/pancake-hunny"
          >
            <StyledPartnerImg src={dappImg} />
          </StyledLink>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={2}>
          <StyledLink
            onClick={() =>
              analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.FOOTER_CHAINLINK_CLICK)
            }
            target="_blank"
            href="https://medium.com/hunnyfinance/pancakehunny-integrates-chainlink-price-feeds-to-protect-against-flash-loan-attacks-a3dc4d52991"
          >
            <StyledPartnerImg src={chainlinkImg} />
          </StyledLink>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={2}>
          <StyledLink
            onClick={() =>
              analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.FOOTER_DEFILLAMA_CLICK)
            }
            target="_blank"
            href="https://defillama.com/protocol/hunny-finance"
          >
            <StyledPartnerImg src={DefillamaImg} />
          </StyledLink>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={2}>
          <StyledLink
            onClick={() =>
              analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.FOOTER_NOMICS_CLICK)
            }
            target="_blank"
            href="https://nomics.com/assets/hunny-pancake-hunny"
          >
            <StyledPartnerImg src={NomicsImg} />
          </StyledLink>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={2}>
          <StyledLink
            onClick={() =>
              analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.FOOTER_KINGDATA_CLICK)
            }
            target="_blank"
            href={`https://kingdata.com/apy/project?id=546560&lang=${languages?.includes('zh') ? 'cn' : 'en'}`}
          >
            <StyledPartnerImg src={KingDataImg} />
          </StyledLink>
        </Grid>
        <Grid item xs={6} sm={6} md={4} lg={2}>
        <StyledLink
          onClick={() => analytics.sendEvent(GOOGLE_ANALYTIC_EVENTS.FOOTER_DEBANK_CLICK)}
          target="_blank"
          href="https://debank.com/projects/bsc_pancakehunny"
        >
          <StyledPartnerImg src={DeBankImg} />
        </StyledLink>
        </Grid>
      </Grid>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  margin-bottom: 24px;
  width: 100%;
  @media (max-width: 767px) {
    flex-direction: column;
    width: calc(100% - 24px);
    padding: 0 12px;
  } ;
`;

const StyledPartnerImg = styled.img`
  @media (max-width: 1023px) {
    height: 25px;
  }

  @media (max-width: 1000px) {
    height: 23px;
  }

  @media (max-width: 767px) {
    height: auto;
  } ;

  @media (max-width: 420px) {
    width: auto;
    max-width: 100%;
  }
`;

const StyledLink = styled.a`
  box-sizing: border-box;
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 14px;
  opacity: 0.8;
  font-weight: normal;
  padding: 24px 8px;
  text-decoration: none;

  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

export default HunnyPartner;
