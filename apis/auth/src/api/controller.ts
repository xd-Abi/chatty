import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { compare as comparePasswords, hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import {
  LoginInterface,
  LogoutInterface,
  RefreshTokenInterface,
  SignUpInterface,
  VerifyTokenInterface,
} from './interfaces';
import { UserService } from './services';
import { User } from './entities';

@Controller()
export class AuthController {
  @MessagePattern({ cmd: 'signup' })
  async signup(data: SignUpInterface) {
    if (await this.userService.findByEmail(data.email ?? '')) {
      throw new RpcException(`User with email ${data.email} already exists`);
    }

    const hashedPassword = await hash(data.password, 12);
    const user = await this.userService.save({
      id: await uuidv4(),
      ...data,
      password: hashedPassword,
    });

    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken();

    await this.userService.save({ ...user, refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }

  @MessagePattern({ cmd: 'login' })
  async login(data: LoginInterface) {
    const user = await this.userService.findByEmail(data.email ?? '');

    if (user === null) {
      throw new RpcException(`User with email ${data.email} does not exist`);
    }

    const currentPassword = await this.userService.findHashedPasswordById(
      user.id,
    );
    if (!(await comparePasswords(data.password, currentPassword))) {
      throw new RpcException(`Invalid credentials provided`);
    }

    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken();

    await this.userService.save({ ...user, refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }

  @MessagePattern({ cmd: 'logout' })
  async logout(data: LogoutInterface) {
    const user = await this.userService.findById(data.userId ?? '');

    if (user === null) {
      throw new RpcException(`User with id ${data.userId} does not exist`);
    }

    await this.userService.save({ ...user, refreshToken: null });
    return 'Successfully logged out';
  }

  @MessagePattern({ cmd: 'refresh-token' })
  async refreshToken(data: RefreshTokenInterface) {
    const user = await this.userService.findByRefreshToken(
      data.refreshToken ?? '',
    );

    if (user === null) {
      throw new RpcException(`Invalid refresh token provided`);
    }

    const currentRefreshToken = await this.userService.findRefreshTokenById(
      user.id,
    );

    if (currentRefreshToken !== data.refreshToken) {
      throw new RpcException('Invalid refresh token provided');
    }

    const accessToken = await this.createAccessToken(user);
    const refreshToken = await this.createRefreshToken();

    await this.userService.save({ ...user, refreshToken });

    return {
      accessToken,
      refreshToken,
    };
  }

  @MessagePattern({ cmd: 'verify-token' })
  async verifyToken(data: VerifyTokenInterface) {
    try {
      if (await this.jwtService.verify(data.accessToken)) {
        return true;
      }
    } catch (error) {}

    return false;
  }

  async createAccessToken(user: User) {
    const jwtPayload = { sub: user.id };
    return await this.jwtService.signAsync(jwtPayload);
  }

  async createRefreshToken() {
    return await hash(Math.random().toString(), 12);
  }

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
}
