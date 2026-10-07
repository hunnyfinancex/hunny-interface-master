import React from 'react';
import Card from '../../Card';
import styled from 'styled-components';

interface WalletCardProps {
  icon: React.ReactNode;
  onConnect: () => void;
  title: string;
}

const WalletCard: React.FC<WalletCardProps> = ({ icon, onConnect, title }) => (
  <Card>
    <StyledCard onClick={onConnect}>
      <StyledTitle>{title}</StyledTitle>
      <StyledIcon>{icon}</StyledIcon>
    </StyledCard>
  </Card>
);

const StyledCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  background: #020C20;
  border: 1px solid #272F52;
  &:hover {
    border: 1px solid  ${(props) => props.theme.color.purple[200]};
    border-radius: 12px;
    cursor: pointer;
  }
`;

const StyledTitle = styled.div`
  color: ${(props) => props.theme.color.grey[300]};
  font-size: 18px;
  font-weight: 500;
  padding: 20px 24px;
  text-align: center;
`;

const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  width: 60px;
`;

export default WalletCard;
