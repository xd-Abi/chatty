import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GatewayController } from './controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          port: (process.env.USER_SERVICE_PORT ?? 0) as number,
        },
      },
      {
        name: 'FRIEND_SERVICE',
        transport: Transport.TCP,
        options: {
          port: (process.env.FRIEND_SERVICE_PORT ?? 0) as number,
        },
      },
    ]),
  ],
  controllers: [GatewayController],
})
export class AppModule {}
