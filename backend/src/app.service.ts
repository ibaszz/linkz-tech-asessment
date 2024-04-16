import { Injectable } from '@nestjs/common';
import { BaseResponse } from 'helper/BaseResponse';

@Injectable()
export class AppService {
  getHello(): BaseResponse<string> {
    return {
      data: 'hallo',
      status: 'hello',
      message: 'helos',
    };
  }
}
