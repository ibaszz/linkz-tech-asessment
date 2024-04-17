import { Injectable, LoggerService, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';
import { Logger } from '../logger/Logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: LoggerService;
  constructor(logger: Logger) {
    this.logger = logger;
  }
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log('Incomming Request', () => {
      const { body } = req;
      return {
        context: {
          query: req.query,
          params: req.params,
          body: body,
          headers: req.headers,
        },
      };
    });
    next();
  }
}
