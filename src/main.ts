import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);

  app.enableCors({ 
  origin: '*',  // Permite todas las URLs
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true 
});
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const port = envs.port || 3000;
  await app.listen(port);
  logger.log(`REST API running on port: ${port}`);
}

bootstrap();
