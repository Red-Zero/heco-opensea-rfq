import { BadRequestException } from "@nestjs/common";
import * as Validate from "request-validate";

/**
 * 
 * @param validationInfo  验证信息
 * @param validationInfo.name 需要验证的request参数,如body，parmams，query,header
 * @param validationInfo.rules 验证规则,多个验证规则用 ｜ 分隔
           required: 必填字段
           numeric： 必须为数字
           array： 必须是数组
           min： 数字：最小值，字符：最小长度
           max：
           in：必须在范围内 eg: in:a,b,c
* @param message  返回消息       
 * @returns 
 */
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const BodyValidation = createParamDecorator(
  (validationInfo: any, ctx: ExecutionContext) => {
    const message = validationInfo.message
      ? validationInfo.message
      : "Validation failed'";
    const request = ctx.switchToHttp().getRequest();
    try {
      Validate(
        request.body[validationInfo.name],
        validationInfo.rules,
        message
      );
    } catch (err) {
      console.log(err.message);
      throw new BadRequestException(message);
    }
    return request.body;
  }
);

export const QueryValidation = createParamDecorator(
  (validationInfo: any, ctx: ExecutionContext) => {
    const message = validationInfo.message
      ? validationInfo.message
      : "Validation failed'";
    const request = ctx.switchToHttp().getRequest();
    try {
      Validate(request.query, validationInfo.rules, message);
    } catch (err) {
      console.log(err.message);
      throw new BadRequestException(message);
    }
    return request.query;
  }
);
