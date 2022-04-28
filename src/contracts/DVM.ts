import dvmabi from "./abis/DVMAbi";
import { baseContract } from "./base";

export class DVM extends baseContract {
  constructor(network, address, blocknumber = null) {
    super(dvmabi, network, address, blocknumber);
  }
  async getBaseToken() {
    return await this.contract.methods._BASE_TOKEN_().call();
  }
  async getQuoteToken() {
    return await this.contract.methods._QUOTE_TOKEN_().call();
  }
  async getBaseReserve() {
    return await this.contract.methods._BASE_RESERVE_().call();
  }
  async getQuoteReserve() {
    return await this.contract.methods._QUOTE_RESERVE_().call();
  }
  async getTotalSupply() {
    return await this.contract.methods.totalSupply().call();
  }
}
