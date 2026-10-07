import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HunnyLogo from 'assets/img/hunny-logo.png';
import LoveLogo from 'assets/img/token-love.png';

import PoolCardItem from './PoolCardItem';
import axios from 'axios';
import BigNumber from 'bignumber.js';

export interface DetailPool {
  icon: string;
  title: string;
  earn: string;
  url: string;
  totalAmount: BigNumber;
  apr: string;
}

const poolsInitial: {
  [key: string]: DetailPool;
} = {
  HUNNY: {
    icon: HunnyLogo,
    title: 'HUNNY',
    earn: 'CAKE-BUSD-BNB',
    url: 'https://hunnyplay.io/staking?utm_source=hunny.finance&utm_medium=hunnystakingpool',
  },
  LOVE: {
    icon: LoveLogo,
    title: 'LOVE',
    earn: 'CAKE-BUSD-BNB',
    url: 'https://hunnyplay.io/staking?utm_source=hunny.finance&utm_medium=lovestakingpool',
  },
};

const PoolList: React.FC = () => {
  const [pools, setPools] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        baseURL: process.env.REACT_APP_API,
        url: '/api/v1/staking/stats/get/',
        method: 'POST',
      })
        .then((res) => res?.data || null)
        .catch((err) => null);

      const defaulPools = {
        apy: '65',
        pools: [
          {
            network: 'BNB',
            currency: 'HUNNY',
            total_amount: '30298977.774579061266237538',
            create_time: 1658213913,
          },
          {
            network: 'BNB',
            currency: 'LOVE',
            total_amount: '387867.958406398',
            create_time: 1658213913,
          },
        ],
      };
      const dataPool = result?.data || defaulPools;

      if (dataPool?.pools?.length > 0) {
        const infoPools = dataPool.pools.map(
          (pool: { currency: string; total_amount: string }) => {
            const currency: string = pool.currency ?? '';
            const defaultInfoPool = poolsInitial[currency];
            if (!defaultInfoPool) return null;

            return {
              ...defaultInfoPool,
              apr: dataPool.apy,
              totalAmount: new BigNumber(pool.total_amount),
            };
          }
        );
        setPools(infoPools);
      }
    };
    fetch();
  }, []);

  return (
    <Wrapper>
      <StyledTitlte>Hunny Pools ({pools.length ?? 0})</StyledTitlte>
      {pools?.length > 0 &&
        pools.map((pool) => (
          <PoolCardItem
            key={pool.title}
            icon={pool.icon}
            title={pool.title}
            earn={pool.earn}
            url={pool.url}
            totalAmount={pool.totalAmount}
            apr={pool.apr}
          />
        ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledTitlte = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;

  color: ${(props) => props.theme.color.yellow[100]};
`;

export default React.memo(PoolList);
