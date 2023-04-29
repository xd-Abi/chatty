import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entities';
import { FriendController } from './controller';

@Module({
  imports: [TypeOrmModule.forFeature([Friend])],
  controllers: [FriendController],
})
export class FriendModule {}
