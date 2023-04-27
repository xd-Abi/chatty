/**
 * @packageDocumentation
 * @module Gateway-Main
 */

import { Module } from '@nestjs/common';
import { GatewayController } from './controller';

@Module({
  controllers: [GatewayController],
})
export class AppModule {}
