import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const startServer = async () => {
  const app = await NestFactory.create(AppModule);
  app.listen(process.env.PORT || 4000, () => console.log('Server started'));
};

startServer().catch((error) => {
  console.log(error.message);
  process.exit(1);
});
