import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    let message = "null";
    switch (status) {
      case 404:
        message = "not found";
        break;
      default:
        message = exception.message;
        break;
    }
    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
