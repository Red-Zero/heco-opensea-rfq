import ConnectionNames from '@constants/ConnectionName';
import { Web3Class } from '@contracts/base';
import { openseaBase } from '@contracts/opensea';
import { Accounts, simpleAccount } from '@entity/db_opensea/account';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { getUserBalance } from '@contracts/opensea/apis';

@Injectable()
export class AppService {
  getHello(): string {
    return 'ppdfadfa';
  }
  /**
   * create many account
   * @param num account num
   */
  async createdAccounts(num: number): Promise<simpleAccount[]> {
    const accounts = [],
      entitys = [];
    const web3 = new Web3Class();
    const now = moment().toDate();
    for (let i = 0; i < num; ++i) {
      const account = web3.createAccount();
      const entity = new Accounts();
      entity.address = account.address;
      entity.private_key = account.privateKey;
      entity.created_at = now;
      entity.updated_at = now;
      entitys.push(entity);
      accounts.push(entity.toSimpleAccount());
    }
    // const queryBuilder = getConnection(
    //   ConnectionNames.OPENSEA,
    // ).createQueryBuilder();
    // await queryBuilder.insert().into(Accounts).values(entitys).execute();
    return accounts;
  }
  /**
   * get user nft balance list info
   * @param address user address
   * @returns
   */
  async getNftList(address: string, offset, limit) {
    const res = await getUserBalance(address, offset, limit);
    return res;
  }

  async createBuyOrder() {
    const opensea = new openseaBase();
    const res = await opensea.createbuyOrder('');
    return res;
  }
}
