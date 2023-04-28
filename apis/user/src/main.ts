import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const config: MicroserviceOptions = {
    transport: Transport.TCP,
    options: {
      port: 8081,
    },
  };

  const app = await NestFactory.createMicroservice(AppModule, config);
  await app.listen();
}

bootstrap();
