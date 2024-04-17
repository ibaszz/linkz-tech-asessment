import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  LoggerService,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import Exception from '../exceptions/exception';
import BaseResponse from '../response/BaseResponse';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const { body } = request;

    this.logger.error(`Error ${status} for Request`, {
      context: {
        query: request.query,
        params: request.params,
        body: body,
        headers: request.headers,
        exception: exception,
      },
    });

    if (exception instanceof BadRequestException) {
      return response
        .status(status)
        .json(
          BaseResponse.createFailedResponse(
            { transactionId: 'TRXERROR', channel: 'server' },
            null,
            exception.getResponse()['message'][0],
          ),
        );
    }

    if (exception instanceof Exception) {
      return response.status(status).json({
        statusCode: exception.code,
        statusDesc: exception.message,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }

    return response.status(status).json({
      statusCode: status,
      statusDesc: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
