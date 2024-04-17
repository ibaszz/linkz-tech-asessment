import { Controller, UseGuards, Version, Request } from '@nestjs/common';
import { Post, Put, Query } from '@nestjs/common/decorators';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { FavoriteService } from './favorite.service';
import BaseResponse from 'src/commons/response/BaseResponse';

@ApiTags('Favorite Controller')
@Controller('favorite')
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  async like(@Request() req, @Query('catId') catId: string) {
    try {
      const success = await this.favoriteService.like(req.user.userId, catId);
      return BaseResponse.createSuccessResponse(null, success);
    } catch (e) {}
  }

  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Put()
  @ApiBearerAuth()
  async unlike(@Request() req, @Query('catId') catId: string) {
    try {
      const success = await this.favoriteService.unlike(req.user.userId, catId);
      return BaseResponse.createSuccessResponse(null, success);
    } catch (e) {}
  }
}
