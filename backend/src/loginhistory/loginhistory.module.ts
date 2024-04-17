import { Module } from '@nestjs/common';
import { DBModule } from 'src/config/db';
import { LoginHistoryService } from './loginhistory.service';
import { LoggerModule } from 'src/commons/logger';

@Module({
  imports: [LoggerModule, DBModule],
  providers: [LoginHistoryService],
  exports: [LoginHistoryService],
})
export class LoginHistoryModule {}
