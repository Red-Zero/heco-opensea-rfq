import {
  Injectable,
  NestMiddleware,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const now = Date.now();
    console.log(
      `Request:--${req.method}:${req.url},query:${JSON.stringify(
        req.query
      )},params:${JSON.stringify(req.params)},body:${JSON.stringify(
        req.body
      )},header:${JSON.stringify(req.headers)}`
    );
    req.headers["dodoexTime"] = now + "";
    next();
  }
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => {
        console.log(
          `Response:--${req.method}:${req.url},
          query:${JSON.stringify(req.query)},
          params:${JSON.stringify(req.params)},
          body:${JSON.stringify(req.body)}
          time:${
            req.headers["dodoexTime"]
              ? Date.now() - parseInt(req.headers["dodoexTime"])
              : " undefined"
          }
          returnData:${JSON.stringify(data)}
        `
        );
        return data;
      })
    );
  }
}
