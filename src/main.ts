import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ResponseFormat, ResponseInterceptor } from './infrastructure/common/interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { LoggerService } from './infrastructure/logger/logger.service';
import { AllExceptionFilter } from './infrastructure/common/filter/exception.filter';

async function bootstrap() {
  const env = process.env.NODE_ENV;
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  // Filter
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));

  // pipes
  app.useGlobalPipes(new ValidationPipe());

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  // swagger config
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Public Nestjs')
      .setDescription('Example with locus')
      .setVersion('1')
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [ResponseFormat],
      deepScanRoutes: true,
    });
    SwaggerModule.setup('/api/docs', app, document);
  }

  await app.listen(3000);
}
bootstrap();
