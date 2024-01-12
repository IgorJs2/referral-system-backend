import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as express from 'express';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(server),
  );

  const configService = app.get<ConfigService>(ConfigService);

  const corsOptions = {
    credentials: true,
    origin: ['http://localhost:4200'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Access-Control-Allow-Origin',
    ],
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS,PATCH',
  };

  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors(corsOptions);

  const port = configService.get('port');

  await app.listen(port, () => {
    console.log('App has been started on port ' + port);
  });
}
bootstrap();
