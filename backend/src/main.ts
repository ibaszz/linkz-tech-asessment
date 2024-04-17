import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { Logger } from './commons/logger/Logger';
import { HttpExceptionFilter } from './commons/filter/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = app.get(Logger);

  app.use(
    helmet(),
    compression(),
    json({ limit: '50mb' }),
    urlencoded({ extended: true, limit: '50mb' }),
  );
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Linkz - Test Asessment')
    .setDescription('Linkz - Test Assesment API Documentation')
    .setVersion('1.0')
    .setBasePath('/api-be')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(4000);
}

bootstrap();
