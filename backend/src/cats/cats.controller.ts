import { Controller, Get, UseGuards, Version, Request } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import BaseResponse from 'src/commons/response/BaseResponse';
import { BaseApiRequest } from 'src/commons/request/BaseApiRequest';
import { CatsService } from './cats.service';

@ApiTags('Cats Controller')
@Controller('cats')
export class CatsController {
  constructor(private catService: CatsService) {}
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  @ApiQuery({
    name: 'transactionId',
    example: 'TRX0001',
  })
  @ApiQuery({
    name: 'channel',
    example: 'UI',
  })
  async cats(
    @Request() req,
    @Query('transactionId') transactionId: string,
    @Query('channel') channel: string,
  ) {
    try {
      const cats = await this.catService.getCats();
      return BaseResponse.createSuccessResponse(
        new BaseApiRequest(transactionId, channel),
        cats,
      );
    } catch (e) {}
  }
}
