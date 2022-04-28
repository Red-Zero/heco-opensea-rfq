import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { LoggerMiddleware } from "@middleware/globalLog.middleware";
import { AppController } from "../controllers/app.controller";
import { AppService } from "../services/app.service";

@Module({
  imports: [],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("/");
  }
}
