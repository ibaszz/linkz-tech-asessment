import { Module } from '@nestjs/common';
import { DBModule } from 'src/config/db';
import { UsersService } from './users.service';
import { LoggerModule } from 'src/commons/logger';

@Module({
  imports: [LoggerModule, DBModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
