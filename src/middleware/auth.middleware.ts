import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("******", req.query);
    if (req.query.err) {
      throw new HttpException(
        { code: "-1", msg: "error" },
        HttpStatus.FORBIDDEN
      );
    }
    next();
  }
}
