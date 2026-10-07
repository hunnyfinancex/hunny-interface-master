import BigNumber from 'bignumber.js';
import React from 'react';
import { delineate, toTokenUnitsBN } from '../../modules/number';

export interface NumberDisplayProps {
  value: BigNumber;
  fixed?: number;
  decimals?: number;
}

const NumberDisplay: React.FC<NumberDisplayProps> = React.memo(
  ({ value, fixed = 10, decimals = 18 }) => {
    const parsedValue = toTokenUnitsBN(value, decimals)
      .toFixed(fixed + 1)
      .toString();

    return (
      <>
        {delineate(
          Number(parsedValue)
            ? parsedValue
            : toTokenUnitsBN(value, decimals)
                .toFixed(10 + 1)
                .toString(),
          Number(parsedValue) ? fixed : 10
        )}
      </>
    );
  },
  (pre: NumberDisplayProps, next: NumberDisplayProps) => {
    return next.value && next.value.isEqualTo(pre.value);
  }
);

export default NumberDisplay;
