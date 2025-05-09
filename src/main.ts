import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const startServer = async () => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.listen(process.env.PORT || 4000, () => console.log('Server started'));
};

startServer().catch((error) => {
  console.log(error.message);
  process.exit(1);
});
