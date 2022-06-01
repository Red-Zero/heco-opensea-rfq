import { ErrorCode, HttpResponse } from '@constants/ErrorCode';
import { BodyValidation } from '@lib/paramValidation';
import { Controller, HttpCode, Post } from '@nestjs/common';

import { AppService } from '../services/app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/account/create')
  @HttpCode(200)
  async created(
    @BodyValidation({
      rules: {
        num: 'required|numeric',
      },
    })
    body,
  ): Promise<HttpResponse> {
    const res = await this.appService.createdAccounts(body.num);
    return ErrorCode.getResul(ErrorCode.ERROR_CODE.SUCESS, 'success', res);
  }
  @Post('/account/balance')
  @HttpCode(200)
  async nftBalance(
    @BodyValidation({
      rules: {
        address: 'required',
        page: 'numeric',
        limit: 'numeric',
      },
    })
    body,
  ): Promise<HttpResponse> {
    const offset = body.offset || 0;
    let limit = body.limit || 20;
    if (limit < 20) limit = 20;
    if (limit > 50) limit = 50;
    const res = await this.appService.getNftList(body.address, offset, limit);
    return ErrorCode.getResul(ErrorCode.ERROR_CODE.SUCESS, 'success', res);
  }

  @Post('/account/sale')
  @HttpCode(200)
  async sale(): Promise<HttpResponse> {
    const res = await this.appService.createBuyOrder();
    return ErrorCode.getResul(ErrorCode.ERROR_CODE.SUCESS, 'success', res);
  }
}
