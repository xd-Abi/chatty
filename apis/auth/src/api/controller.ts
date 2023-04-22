import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { LoginInterface, LogoutInterface, SignUpInterface } from './interfaces';
import { UserService } from './services';

@Controller()
export class AuthController {
  @MessagePattern({ cmd: 'signup' })
  async signup(data: SignUpInterface) {
    if ((await this.userService.findByEmail(data.email)) !== null) {
      throw new RpcException('Email already exists');
    }

    const user = await this.userService.save(data);
    const jwtPayload = { sub: user.id };
    const accessToken = await this.jwtService.signAsync(jwtPayload);

    return {
      accessToken,
    };
  }

  @MessagePattern({ cmd: 'login' })
  async login(data: LoginInterface) {
    console.log(data);
    return 'Hello, from Auth API';
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
