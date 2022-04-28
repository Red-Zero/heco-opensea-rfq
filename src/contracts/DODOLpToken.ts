import * as abis from "./abis/DODOLpToken.json";
import { baseContract, baseMulticallContract } from "./base";
export class DODOLpToken extends baseContract {
  constructor(network, address, blockNumber = null) {
    super(abis, network, address, blockNumber);
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
export class DODOLpTokenMulticall extends baseMulticallContract {
  address;
  constructor(network, address, blockNumber = null) {
    super(network, address, blockNumber);
  }

  async getOriginTokens(datas, targetKey) {
    const calls = [],
      resList = [],
      abi = abis[17];
    for (const item of datas) {
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
      resList.push(Object.assign(datas[i], { origin_token: data[0] }));
    }
    return resList;
  }
  async getBalanceOf(datas, targetKey, user) {
    const calls = [],
      resList = [],
      abi = abis[11];
    for (const item of datas) {
      calls.push({
        target: item[targetKey],
        callData: this.web3.eth.abi.encodeFunctionCall(abi, [user]),
      });
    }

    const result = await this.multicallContract.methods.aggregate(calls).call();
    for (const i in result.returnData) {
      const data = this.web3.eth.abi.decodeParameters(
        abi.outputs,
        result.returnData[i]
      );
      resList.push(Object.assign(datas[i], { balance: data[0] }));
    }
    return resList;
  }
  async getOwners(datas, targetKey) {
    const calls = [],
      resList = [],
      abi = abis[8];
    for (const item of datas) {
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
      resList.push(Object.assign(datas[i], { owner: data[0] }));
    }
    return resList;
  }
  async getSymbols(datas, targetKey) {
    const calls = [],
      resList = [],
      abi = abis[18];
    for (const item of datas) {
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
      resList.push(Object.assign(datas[i], { symbol: data[0] }));
    }
    return resList;
  }
  async getDecimals(datas, targetKey) {
    const calls = [],
      resList = [],
      abi = abis[14];
    for (const item of datas) {
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
      resList.push(Object.assign(datas[i], { decimals: data[0] }));
    }
    return resList;
  }
}
