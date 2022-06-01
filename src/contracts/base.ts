import * as config from './endPoints.json';
import * as multicall_abi from './abis/MULTI_CALL.json';
const Web3 = require('web3');
const Web3EthContract = require('web3-eth-contract');

export class Web3Class {
  web3;
  constructor(chain = 'ethereum') {
    const endpoint = config.rpcEndpoints[chain];
    this.web3 = new Web3(new Web3.providers.HttpProvider(endpoint));
  }
  createAccount() {
    return this.web3.eth.accounts.create();
  }
}

export class baseContract {
  contract;
  network;
  constructor(abi, network, address, blockNumber = null) {
    const endpoint = config.rpcEndpoints[network];
    Web3EthContract.setProvider(endpoint);
    this.contract = new Web3EthContract(abi, address);
    if (blockNumber) {
      this.contract.defaultBlock = blockNumber;
    }
    this.network = network;
  }
}
export class baseMulticallContract {
  multicallContract;
  web3;
  network;
  constructor(network, multicall_address, blockNumber = null) {
    this.network = network;
    this.web3 = new Web3('ws://some.local-or-remote.node:8546');
    const endpoint = config.rpcEndpoints[network];
    Web3EthContract.setProvider(endpoint);
    this.multicallContract = new Web3EthContract(
      multicall_abi,
      multicall_address,
    );
    if (blockNumber) {
      this.multicallContract.defaultBlock = blockNumber;
    }
  }
}

export async function getBolckNum(network) {
  const endpoint = config.rpcEndpoints[network];
  const web3 = new Web3(new Web3.providers.HttpProvider(endpoint));
  //let number = web3.eth.blockNumber

  const number = await web3.eth.getBlockNumber();
  return number;
}

export async function findCreateBlock(address, highest_block, network) {
  const endpoint = config.rpcEndpoints[network];
  const provider = new Web3(new Web3.providers.HttpProvider(endpoint));
  const block = await searchContractCretionBlock(
    address,
    highest_block,
    provider,
  );
  return block;
}

export async function getTransaction(network, hash) {
  const endpoint = config.rpcEndpoints[network];
  const web3 = new Web3(new Web3.providers.HttpProvider(endpoint));
  //let number = web3.eth.blockNumber

  const transaction = await web3.eth.getTransactionReceipt(hash);

  return transaction;
}

async function searchContractCretionBlock(address, highest_block, provider) {
  //let highest_block =parseInt(await provider.eth.getBlockNumber());
  let lowest_block = 0;

  while (lowest_block <= highest_block) {
    const search_block = Math.floor((lowest_block + highest_block) / 2);
    const contract_code = await provider.eth.getCode(address, search_block);
    if (contract_code != '0x') {
      highest_block = search_block;
    } else if (contract_code == '0x') {
      lowest_block = search_block;
    }
    if (highest_block == lowest_block + 1) {
      return highest_block;
    }
  }
}
