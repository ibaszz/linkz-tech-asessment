import { Module } from '@nestjs/common';
import { DBModule } from 'src/config/db';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';

@Module({
  imports: [DBModule],
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
