import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { TransformInterceptor } from "./middleware/globalLog.middleware";
import "reflect-metadata";
import { createConnections } from "typeorm";

import { getConfig } from "./config/index";
import { HttpExceptionFilter } from "@lib/ExceptionFilter";

async function bootstrap() {
  //typeorm初始化
  await createConnections(getConfig("db"));
  console.log("ORM 链接成功");

  //nest初始化
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  //跨域资源共享
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
