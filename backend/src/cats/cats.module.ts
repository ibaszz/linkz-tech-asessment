import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [UsersModule],
  providers: [CatsService],
  controllers: [CatsController],
})
export class CatsModule {}
