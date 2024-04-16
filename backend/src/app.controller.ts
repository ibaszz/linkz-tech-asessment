import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { BaseResponse } from 'helper/BaseResponse';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): BaseResponse<string> {
    return this.appService.getHello();
  }
}
