import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthController } from './api/controller';
import { UserService } from './api/services';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { User } from './api/entities';
import { AuthModule } from './api/module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://auth:uZdJ8y92!lwL@localhost:5432/auth',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User],
      namingStrategy: new SnakeNamingStrategy(),
    }),
    JwtModule.register({
      global: true,
      secret: 'auth-secret',
      signOptions: {
        expiresIn: '60s',
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
