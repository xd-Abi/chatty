import { NestFactory } from '@nestjs/core';
import { AppModule } from './app';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const config: MicroserviceOptions = {
    transport: Transport.TCP,
    options: {
      port: (process.env.SERVICE_PORT ?? 8080) as number,
    },
  };

  const app = await NestFactory.createMicroservice(AppModule, config);
  await app.listen();
}

bootstrap();
