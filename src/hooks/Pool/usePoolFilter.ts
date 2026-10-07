import { AssetEnum, AssetTypeEnum } from "modules/enums/Asset.enum";
import { State } from "modules/models/state.model";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const usePoolFilter = () => {

  const poolList = useSelector(
    (state: State) => state.pools.pools[state.pools.selectedPoolType]
  );

  const selectedAssets = useSelector(
    (state: State) => state.pools.selectedAssets
  );

  const searchValue = useSelector(
    (state: State) => state.pools.searchValue
  );

  const selectedIds = useMemo(() => {
    const parsedSelectedAssets = Object.entries(selectedAssets[AssetTypeEnum.Asset])
      .map(([key, value]) => value && key)
      .filter((item) => item);

    const parsedSelectedFarms = Object.entries(selectedAssets[AssetTypeEnum.Farm])
      .map(([key, value]) => value && key)
      .filter((item) => item);

    const parsedSelectedStatus = Object.entries(selectedAssets[AssetTypeEnum.Status])
      .map(([key, value]) => value && key)
      .filter((item) => item);


    let selectedPools = poolList;

    if (searchValue) {
      selectedPools = selectedPools.filter(
        item =>
          item.poolName.toLowerCase().includes(searchValue.trim().toLowerCase())
      )
    }

    [parsedSelectedFarms, parsedSelectedStatus, parsedSelectedAssets].forEach(items => {
      if (items.length) {
        selectedPools = selectedPools.filter(
          item =>
            item.tag.some(tag => items.indexOf(String(tag)) != -1)
        )
      }
    })

    return new Set(selectedPools.map(item => item.id));
  }, [searchValue, selectedAssets])

  return selectedIds;
};
