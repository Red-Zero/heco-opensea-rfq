import * as erc20_abi from "./abis/ERC20.json";
import { baseContract, baseMulticallContract } from "./base";

export class Erc20 extends baseContract {
  constructor(network, address, blockNumber = null) {
    super(erc20_abi, network, address, blockNumber);
  }
  async getBalance(userAddress) {
    return await this.contract.methods.balanceOf(userAddress).call();
  }

  async getDecimals() {
    return await this.contract.methods.decimals().call();
  }

  async getSymbol() {
    return await this.contract.methods.symbol().call();
  }

  async getTotalSupply() {
    return await this.contract.methods.totalSupply().call();
  }

  async getAllowance(owner, spender) {
    return await this.contract.methods.allowance(owner, spender).call();
  }
}

export class Erc20Multicall extends baseMulticallContract {
  network;
  constructor(network, address, blockNumber = null) {
    super(network, address, blockNumber);
    this.network = network;
  }

  async getDecimals(params, targetKey = "reward_token") {
    const calls = [],
      abi = erc20_abi[4],
      rewardList = [];
    for (const item of params) {
      calls.push({
        target: item[targetKey],
        callData: this.web3.eth.abi.encodeFunctionCall(abi, []),
      });
    }
    const result = await this.multicallContract.methods.aggregate(calls).call();
    for (const i in result.returnData) {
      const data = this.web3.eth.abi.decodeParameters(
        abi.outputs,
        result.returnData[i]
      );
      rewardList.push(Object.assign(params[i], { decimals: data[0] }));
    }
    return rewardList;
  }

  async getSymbol(params, targetKey = "reward_token") {
    const calls = [],
      abi = erc20_abi[8],
      rewardList = [];
    for (const item of params) {
      calls.push({
        target: item[targetKey],
        callData: this.web3.eth.abi.encodeFunctionCall(abi, []),
      });
    }
    const result = await this.multicallContract.methods.aggregate(calls).call();
    for (const i in result.returnData) {
      const data = this.web3.eth.abi.decodeParameters(
        abi.outputs,
        result.returnData[i]
      );
      rewardList.push(Object.assign(params[i], { symbol: data[0] }));
    }
    return rewardList;
  }

  async getBalanceOf(params, targetKey = "lpToken", ownerKey = "address") {
    const calls = [],
      abi = erc20_abi[6],
      rewardList = [];

    for (const item of params) {
      calls.push({
        target: item[targetKey],
        callData: this.web3.eth.abi.encodeFunctionCall(abi, [item[ownerKey]]),
      });
    }

    const result = await this.multicallContract.methods.aggregate(calls).call();
    for (const i in result.returnData) {
      const data = this.web3.eth.abi.decodeParameters(
        abi.outputs,
        result.returnData[i]
      );
      rewardList.push(Object.assign(params[i], { balance: data[0] }));
    }
    return rewardList;
  }

  async getTotalSupply(params, targetKey = "lpToken") {
    const calls = [],
      abi = erc20_abi[2],
      rewardList = [];
    for (const item of params) {
      calls.push({
        target: item[targetKey],
        callData: this.web3.eth.abi.encodeFunctionCall(abi, []),
      });
    }
    const result = await this.multicallContract.methods.aggregate(calls).call();
    for (const i in result.returnData) {
      const data = this.web3.eth.abi.decodeParameters(
        abi.outputs,
        result.returnData[i]
      );
      rewardList.push(Object.assign(params[i], { total_supply: data[0] }));
    }
    return rewardList;
  }
}
