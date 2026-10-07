import { Grid } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import LotteryCard from './LotteryCard';
import LotteryDrawSection from './LotteryDrawSection';

import LotteryBuyTicketSection from './LotteryBuyTicketSection';
import LotteryMyPrizeSection from './LotteryMyPrizeSection';
import LotteryDocsSection from './LotteryDocsSection';
import LotteryLastWiningNumber from './LotteryLastWinningNumber';
import { State } from '../../../modules/models/state.model';
import { useSelector } from 'react-redux';

const LotteryCurrentDraw: React.FC = () => {

  const currentRoundNumer = useSelector(
    (state: State) => state.lottery.currentRoundNumber
  );

  return (
    <StyledWrapper>
        <StyledContainerInner>
          <Grid 
            container 
            direction="row"
            spacing={2}
          >
            <Grid item md={6} xs={12}>
              <LotteryCard>
                <LotteryDrawSection roundNumber={currentRoundNumer}/>
              </LotteryCard>
            </Grid>
            
            <Grid 
              container 
              item 
              md={6}
              xs={12}
              direction="row"
            >
              <Grid item xs={12}>
                <LotteryCard>
                  <LotteryBuyTicketSection/>
                </LotteryCard>
              </Grid>


              <Grid style={{marginTop: 16}} item xs={12}>
                <LotteryCard>
                  <LotteryMyPrizeSection /> 
                </LotteryCard>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <LotteryCard>
                <LotteryLastWiningNumber />
              </LotteryCard>
            </Grid>
          
            <Grid item xs={12}>
              <LotteryCard>
                <LotteryDocsSection />
              </LotteryCard>
            </Grid>

          </Grid>
        </StyledContainerInner>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-family: 'Ubuntu';
  margin: auto;
`;

const StyledContainerInner = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

export default LotteryCurrentDraw;
