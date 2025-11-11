import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);
  app.enableCors({
  origin: '*', // Incluye todos los origins válidos
  methods: '*',
  allowedHeaders: '*'
});



  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  

  await app.listen(3000);
 }
bootstrap();
