import { Controller, Get, StreamableFile } from "@nestjs/common";
import { createReadStream } from "fs";
import * as path from "path";
import { AppService } from "../services/app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get("/wetest-a000cb5bffa1f77e3b753b5132784008.txt")
  getCheckFile(): StreamableFile {
    const filePath = path.join(
      __dirname,
      "../../config/wetest-a000cb5bffa1f77e3b753b5132784008.txt"
    );
    const file = createReadStream(filePath);
    return new StreamableFile(file);
  }
}
