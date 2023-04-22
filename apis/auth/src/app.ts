import { Module } from '@nestjs/common';
import { AuthController } from './api/controller';

@Module({
  imports: [],
  controllers: [AuthController],
})
export class AppModule {}
