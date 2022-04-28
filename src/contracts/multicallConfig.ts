import { ARB_CONFIG_DATA } from "@owen05/dodo-sdk-v2/build/src/data/config/arb-config";
import { BSC_CONFIG_DATA } from "@owen05/dodo-sdk-v2/build/src/data/config/bsc-config";
import { ETH_CONFIG_DATA } from "@owen05/dodo-sdk-v2/build/src/data/config/eth-config";
import { HECO_CONFIG_DATA } from "@owen05/dodo-sdk-v2/build/src/data/config/heco-config";
import { MATIC_CONFIG_DATA } from "@owen05/dodo-sdk-v2/build/src/data/config/matic-config";
import { RINKEBY_CONFIG_DATA } from "@owen05/dodo-sdk-v2/build/src/data/config/rinkeby-config";
import { OK_CONFIG_DATA } from "@owen05/dodo-sdk-v2/build/src/data/config/ok-config";
import { BOBA_CONFIG_DATA } from "@owen05/dodo-sdk-v2/build/src/data/config/boba-config";
import { MOONRIVER_CONFIG_DATA } from "@owen05/dodo-sdk-v2/build/src/data/config/moonriver-config";
import { AURORA_CONFIG_DATA } from "@owen05/dodo-sdk-v2/build/src/data/config/aurora-config";

export default {
  polygon: {
    address: MATIC_CONFIG_DATA.MULTI_CALL,
    network: "matic",
    blocksCountPerYear: 31536000,
  },
  ethereum: {
    address: ETH_CONFIG_DATA.MULTI_CALL,
    network: "mainnet",
    blocksCountPerYear: 2425846,
  },
  bsc: {
    address: BSC_CONFIG_DATA.MULTI_CALL,
    network: "bsc",
    blocksCountPerYear: 10512000,
  },
  arbitrum: {
    address: ARB_CONFIG_DATA.MULTI_CALL,
    network: "arbitrum",
    blocksCountPerYear: 2425846,
  },
  heco: {
    address: HECO_CONFIG_DATA.MULTI_CALL,
    network: "heco",
    blocksCountPerYear: 10512000,
  },
  okchain: {
    address: OK_CONFIG_DATA.MULTI_CALL,
    network: "okchain",
    blocksCountPerYear: 10512000,
  },
  moonriver: {
    address: MOONRIVER_CONFIG_DATA.MULTI_CALL,
    network: "moonriver",
    blocksCountPerYear: 17165220,
  },
  boba: {
    address: BOBA_CONFIG_DATA.MULTI_CALL,
    network: "boba",
    blocksCountPerYear: 282721,
  },
  aurora: {
    address: AURORA_CONFIG_DATA.MULTI_CALL,
    network: "aurora",
    blocksCountPerYear: 3153600,
  },

  rinkeby: {
    address: RINKEBY_CONFIG_DATA.MULTI_CALL,
    network: "rinkeby",
    blocksCountPerYear: 2425846,
  },
};
