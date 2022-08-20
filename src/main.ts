import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser());
  //prefix for API request
  app.setGlobalPrefix('api');
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('JWT Auth API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth')
    .addTag('user')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  Logger.log(
    `[SwaggerResolver] U can check docs for API on ${await app.getUrl()}/docs`,
  );
}
bootstrap();