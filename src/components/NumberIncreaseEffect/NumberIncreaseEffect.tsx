import React, { useCallback, useState } from 'react';
import CountUp from 'react-countup';
import { delineate } from '../../modules/number';

export interface NumberIncreaseEffectProps {
  value: number;
  fixed?: number;
}

const NumberIncreaseEffect: React.FC<NumberIncreaseEffectProps> = React.memo(
  ({ value, fixed = 3 }) => { 

    const [startValue, setStartValue] = useState(0);
    
    const formatValue = (value: number) => {
        return delineate(value.toFixed(fixed +1), fixed)
    }

    const handleValueEnd = ()=>{
      setStartValue(value);
    };

    return (
        <CountUp
          decimals={fixed+1}
          start={startValue}
          end={value}
          formattingFn={formatValue}
          duration={2}
          onEnd={handleValueEnd}
        />
    );
  },
);

export default NumberIncreaseEffect;
