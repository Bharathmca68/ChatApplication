import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { RedisIoAdapter } from './adapters/redis.adapter';
import { AppModule } from './app.module';

async function bootstrap() {

  const logger = new Logger('main-server')

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new RedisIoAdapter(app));
  app.useStaticAssets(join(__dirname, '..', 'resource'));
  const port = parseInt(process.env.SERVER_PORT);
  await app.listen(port);
  logger.log('server listening on port ' + port);
}
bootstrap();
