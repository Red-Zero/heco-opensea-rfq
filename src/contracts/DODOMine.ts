import * as dodoMine_abi from "./abis/DODOMine.json";
import { baseContract, baseMulticallContract } from "./base";
export class DODOMine extends baseContract {
  constructor(network, address, blockNumber = null) {
    super(dodoMine_abi, network, address, blockNumber);
  }

  async getUserToken(user, token) {
    return await this.contract.methods.getUserLpBalance(token, user).call();
  }
  async getAllPendingReward(userAddress) {
    return await this.contract.methods.getAllPendingReward(userAddress).call();
  }
  async totalAllocPoint() {
    return await this.contract.methods.totalAllocPoint().call();
  }
  async poolLength() {
    return await this.contract.methods.poolLength().call();
  }
  async dodoPerBlock() {
    return await this.contract.methods.dodoPerBlock().call();
  }
  async poolInfos(index) {
    return await this.contract.methods.poolInfos(index).call();
  }
  async getPastEvents(event, option) {
    return this.contract.getPastEvents(event, option);
  }
}
export class DODOMineMulticall extends baseMulticallContract {
  address;
  constructor(network, address, blockNumber = null) {
    super(network, address, blockNumber);
  }
  async poolInfos(poolLength, contractAddress) {
    const calls = [],
      abi = dodoMine_abi[24],
      poolInfos = [];
    for (let i = 0; i < poolLength; ++i) {
      poolInfos.push({ poolLength: i });
      calls.push({
        target: contractAddress,
        callData: this.web3.eth.abi.encodeFunctionCall(abi, [i]),
      });
    }
    const result = await this.multicallContract.methods.aggregate(calls).call();
    for (const i in result.returnData) {
      const data = this.web3.eth.abi.decodeParameters(
        abi.outputs,
        result.returnData[i]
      );
      poolInfos[i] = Object.assign(poolInfos[i], {
        lpToken: data.lpToken,
        allocPoint: data.allocPoint,
        lastRewardBlock: data.lastRewardBlock,
        accDODOPerShare: data.accDODOPerShare,
      });
    }
    return poolInfos;
  }

  async symbols(datas, targetKey) {
    const calls = [],
      resList = [],
      abi = {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
      };
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
  async getAllPendingReward(datas, targetKey, user) {
    const calls = [],
      resList = [],
      abi = {
        inputs: [
          {
            internalType: "address",
            name: "_user",
            type: "address",
          },
        ],
        name: "getAllPendingReward",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      };
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
      resList.push(Object.assign(datas[i], { user_reward: data[0] }));
    }
    return resList;
  }
}
