import * as abis from "./abis/DODOAuction.json";
import { baseContract, baseMulticallContract } from "./base";
export class DODOAuction extends baseContract {
  constructor(network, address, blockNumber = null) {
    super(abis, network, address, blockNumber);
  }
}

export class DODOAuctionMulticall extends baseMulticallContract {
  constructor(network, multicallAddress, blockNumber = null) {
    super(network, multicallAddress, blockNumber);
  }

  /**
   * 获取多个拍卖合约的数据
   * @param targets 合约token地址
   * @param abiNames abi的名称
   * @param abiParams abi的参数
   * @returns
   */
  async fetchMultiAuctionContratData(
    targets: string[],
    abiNames: string[],
    abiParams: any[] = []
  ) {
    const abiObjs = {};

    // 组装abis
    for (const abi of abis) {
      const index = abiNames.indexOf(abi.name);
      if (index != -1) {
        abiObjs[abi.name] = {
          abi,
          params: abiParams[index] || [],
        };
      }
    }

    // 拼接合约abis
    const contractAbis = {};
    for (const target of targets) {
      contractAbis[target] = abiObjs;
    }
    if (!Object.keys(contractAbis).length || !Object.keys(abis).length)
      return {};
    return this.fetchMultiData(contractAbis);
  }
}
