import { AssetEnum, AssetTypeEnum } from "modules/enums/Asset.enum";

export const POOL_ASSETS = [
  {
    name: 'Status',
    code: AssetTypeEnum.Status,
    items: [
      {
        code: AssetEnum.New,
        name: 'New'
      },
      {
        code: AssetEnum.Live,
        name: 'Live'
      },
      {
        code: AssetEnum.Finished,
        name: 'Finished'
      }
    ]
  },
  {
    name: 'Asset',
    code: AssetTypeEnum.Asset,
    items: [
      {
        code: AssetEnum.Single,
        name: 'Single Coins'
      },
      {
        code: AssetEnum.LP,
        name: 'LP Coins'
      },
      {
        code: AssetEnum.StableCoin,
        name: 'Stable Coins'
      }
    ]
  },
  {
    name: 'Farm',
    code: AssetTypeEnum.Farm,
    items: [
      {
        code: AssetEnum.Hunny,
        name: 'Hunny Farm 🔥'
      },
      {
        code: AssetEnum.HunnyDao,
        name: 'Hunny DAO 🔥'
      },
      {
        code: AssetEnum.Pancake,
        name: 'PancakeSwap'
      },
      {
        code: AssetEnum.Ape,
        name: 'ApeSwap'
      },
      {
        code: AssetEnum.Alpaca,
        name: 'Alpaca'
      },
      {
        code: AssetEnum.Venus,
        name: 'Venus'
      },
      {
        code: AssetEnum.Baby,
        name: 'BabySwap'
      }
    ]
  }
]