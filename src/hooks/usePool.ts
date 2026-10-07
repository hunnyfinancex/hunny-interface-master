import { poolServiceMapper } from '../modules/pools/BuildPoolMapper';

export const usePool = (address: string) => {
  if (!address) return;
  return poolServiceMapper.getBuildPool(address);
};
