//import * as Web3 from "web3";
const Web3 = require('web3');
import * as config from 'config';
import { OpenSeaPort, Network } from 'opensea-js';
import * as endPoints from '@contracts/endPoints.json';
import { OpenSeaAsset } from 'opensea-js/lib/types';

// This example provider won't let you make transactions, only read-only calls:

export class openseaBase {
  seaport: OpenSeaPort;
  constructor() {
    let networkName = Network.Rinkeby;
    let endPoint = endPoints.rpcEndpoints.rinkeby;
    if (config.network == Network.Main) {
      networkName = Network.Main;
      endPoint = endPoints.rpcEndpoints.ethereum;
    }

    const provider = new Web3.providers.HttpProvider(endPoint);
    this.seaport = new OpenSeaPort(provider, {
      networkName,
    });
  }

  async createbuyOrder(address) {
    const assets = [
      {
        tokenId: '597310',
        tokenAddress: '0xf5de760f2e916647fd766b4ad9e85ff943ce3a2b',
      },
    ];
    const offer = await this.seaport.createBundleBuyOrder({
      assets,
      accountAddress: '0x7545F4266Aeb59D2F89b82e10A02af4921142AAA',
      startAmount: 2.4,
      // Optional expiration time for the order, in Unix time (seconds):
      expirationTime: Math.round(Date.now() / 1000 + 60 * 60 * 24), // One day from now
    });
    console.log(offer);
  }
}
