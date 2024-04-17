import { Controller, Get, UseGuards, Version, Request } from '@nestjs/common';
import { Query } from '@nestjs/common/decorators';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ProfileService } from './profile.service';
import BaseResponse from 'src/commons/response/BaseResponse';
import { BaseApiRequest } from 'src/commons/request/BaseApiRequest';

@ApiTags('Profile Controller')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
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
  async profile(
    @Request() req,
    @Query('transactionId') transactionId?: string,
    @Query('channel') channel?: string,
  ) {
    try {
      const profile = await this.profileService.getProfile(req.user);
      return BaseResponse.createSuccessResponse(
        new BaseApiRequest(transactionId, channel),
        profile,
      );
    } catch (e) {}
  }
}
