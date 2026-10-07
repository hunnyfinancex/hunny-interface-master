import React from 'react';
import styled from 'styled-components';

export interface LotteryBallProps{
  value: number;
}

const LotteryBall: React.FC<LotteryBallProps> = ({value}) => {
  let ballColor = 'radial-gradient(circle closest-side,#faa,#800)';

  switch (value) {
    case 1:
      ballColor = 'radial-gradient(circle closest-side,#fcf7dc,#fdd305)';
      break;
    case 2:
      ballColor = 'radial-gradient(circle closest-side,#c7ecfc,#03A9F4)';
    break;
    case 3:
      ballColor = 'radial-gradient(circle closest-side,#e1ebbc,#95BA07)';
      break;
    case 4:
      ballColor = 'radial-gradient(circle closest-side,#ffe1d1,#fc5e07)';
      break;
    case 5:
      ballColor = 'radial-gradient(circle closest-side,#fff,#A8A9AC)';
      break;
    case 6:
      ballColor = 'radial-gradient(circle closest-side,#ffd9f1,#9D186B)';
    break;
    case 7:
      ballColor = 'radial-gradient(circle closest-side,#d1c5cd,#510239)';
      break;
    case 8:
      ballColor = 'radial-gradient(circle closest-side,#f3fcc0,#C3DC42)';
      break;
    case 9:
      ballColor = 'radial-gradient(circle closest-side,#faa,#CC1E27)';
    break;
    case 10:
      ballColor = 'radial-gradient(circle closest-side,#acc6f2,#002C75)';
      break;
    case 11:
      ballColor = 'radial-gradient(circle closest-side,#faf3d7,#F8DD6C)';
      break;
    case 12:
      ballColor = 'radial-gradient(circle closest-side,#e3eeff,#A4C5FA)';
      break;
    case 13:
      ballColor = 'radial-gradient(circle closest-side,#fadcc8,#F07624)';
    break;
    case 14:
      ballColor = 'radial-gradient(circle closest-side,#f7d9fc,#B72ACE)';
      break;
    default:
      break;
  }

  return (
    <StyledLotteryBall style={{background: ballColor}} className="noselect">
      {value}
      <StyledWhiteBackground/>
    </StyledLotteryBall>              
  );
};

const StyledLotteryBall = styled.div`
  display: inline-block;
  margin: 2px 3px;
  text-align: center;
  width: 58px;
  height: 58px;
  line-height: 56px;
  background: radial-gradient(circle closest-side,#faa,#800);
  border-radius: 50%;
  color: black;
  text-shadow: 0 0 2px #333;
  font-size: 22px;
  box-shadow: 2px 2px 5px 0px #000, 0 0 10px 1px #444;
  position: relative;
  font-weight:700;
`;

const StyledWhiteBackground = styled.div`
  position: absolute;
  top: 11px;
  left: 11px;
  width: 36px;
  height: 36px;
  background: white;
  display: block;
  border-radius: 50%;
  color: black;
  mix-blend-mode: overlay;
  text-shadow: 0 0 2px #333;
`

export default LotteryBall;
