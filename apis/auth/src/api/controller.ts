import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginInterface, LogoutInterface, SignUpInterface } from './interfaces';
import { UserService } from './services';

@Controller()
export class AuthController {
  @MessagePattern({ cmd: 'signup' })
  async signup(data: SignUpInterface) {
    if ((await this.userService.findByEmail(data.email)) !== null) {
      throw new RpcException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.userService.save({
      ...data,
      password: hashedPassword,
    });
    const jwtPayload = { sub: user.id };
    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return {
      accessToken,
    };
  }

  @MessagePattern({ cmd: 'login' })
  async login(data: LoginInterface) {
    const user = await this.userService.findByEmail(data.email);

    if (
      user === null ||
      !(await bcrypt.compare(data.password, user.password))
    ) {
      throw new RpcException('Invalid email or password');
    }

    const jwtPayload = { sub: user.id };
    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return {
      accessToken,
    };
  }

  @MessagePattern({ cmd: 'logout' })
  async logout(data: LogoutInterface) {
    return 'Hello, from Auth API';
  }

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
}
