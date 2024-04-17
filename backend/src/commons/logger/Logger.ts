import { LoggerService } from '@nestjs/common';
import {
  format,
  transports,
  createLogger,
  Logger as WinstonLogger,
} from 'winston';

const METADATA_FORMAT = format.metadata({
  key: 'meta',
  fillExcept: [],
});

const LOG_FORMAT = format.printf(
  (info) =>
    `${info.timestamp} ${info.level}: ${info.message} ${JSON.stringify(
      info.context,
    )}`,
);

export class Logger implements LoggerService {
  private logger: WinstonLogger;
  private moduleName: string;

  constructor(moduleName?: string) {
    this.setModuleName(moduleName);
    const DEV_ENV = process.env.NODE_ENV === 'development';
    const NON_DEV_ENV = !DEV_ENV;
    const transportList = [];
    transportList.push(
      new transports.Console({
        level: DEV_ENV ? 'debug' : 'info',
        format: NON_DEV_ENV
          ? format.combine(format.timestamp(), METADATA_FORMAT, format.json())
          : format.combine(
              format.timestamp(),
              format.colorize(),
              METADATA_FORMAT,
              LOG_FORMAT,
            ),
      }),
    );
    this.logger = createLogger({ transports: transportList });
  }
  log(message: any, ...optionalParams: any[]) {
    this.createLog('info', message, optionalParams[0]);
  }
  error(message: any, ...optionalParams: any[]) {
    this.createLog('error', message, optionalParams[0]);
  }
  warn(message: any, ...optionalParams: any[]) {
    this.createLog('warn', message, optionalParams[0]);
  }
  debug?(message: any, ...optionalParams: any[]) {
    this.createLog('debug', message, optionalParams[0]);
  }
  verbose?(message: any, ...optionalParams: any[]) {
    this.createLog('verbose', message, optionalParams[0]);
  }

  setModuleName(moduleName?: string) {
    this.moduleName = moduleName || 'NestApplication';
  }

  private createLog(level, message: any, context?: any, category?: string) {
    const actualMessage =
      typeof message['message'] !== 'undefined' ? message['message'] : message;
    const stringMessage =
      typeof actualMessage === 'object'
        ? JSON.stringify(actualMessage, null, 2)
        : actualMessage;
    this.logger.log({
      level,
      message: this.moduleName
        ? `[${this.moduleName}] ${stringMessage}`
        : stringMessage,
      ...context,
      category,
      module: this.moduleName,
      stack: message['stack'],
      app_id: process.env.APP_NAME,
      env: process.env.NODE_ENV,
    });

    if (level === 'error' && process.env.NODE_ENV === 'development') {
      // tslint:disable-next-line:no-console
      console.error(message);
    }
  }
}
