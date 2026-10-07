import React from 'react';
import styled from 'styled-components';
import HunnyTooltip from '../../../components/Tooltip';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { useSelector } from 'react-redux';
import { State } from '../../../modules/models/state.model';
import { delineate, toTokenUnitsBN } from '../../../modules/number';
import { Trans, useTranslation } from 'react-i18next';

const AntiWhaleDescription: React.FC = () => {
  const { t } = useTranslation();

  const antiWhaleLimit = useSelector(
    (state: State) => state.pools.antiWhaleLimit
  );

  const antiWhaleLimitNumber = antiWhaleLimit
    ? delineate(toTokenUnitsBN(antiWhaleLimit, 18).toFixed(1), 0)
    : '...';

  return (
    <StyledFee>
      <StyledInfoIcon
        data-for={`antiwhale-description`}
        data-tip={t(`antiwhaleDescription`)}
      />
      <StyledDescriptionText>
        <Trans i18nKey="antiWhaleContent">
          BUY/SELL Limit {{ antiWhaleLimitNumber }} HUNNY per transaction 🐳
        </Trans>
      </StyledDescriptionText>

      <HunnyTooltip id={`antiwhale-description`} place="left" />
    </StyledFee>
  );
};

const StyledFee = styled.div`
  margin-top: ${(props) => props.theme.spacing[1]}px;

  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: ${(props) => props.theme.color.grey[400]};
  margin-bottom: ${(props) => props.theme.spacing[6]}px;
  padding-left: 24px;
  box-sizing: border-box;

  position: relative;
`;

const StyledDescriptionText = styled.span``;

const StyledInfoIcon = styled(InfoIcon)`
  position: absolute;
  left: 0;
  height: 18px !important;
  color: ${(props) => props.theme.color.grey[400]};
`;

export default AntiWhaleDescription;
