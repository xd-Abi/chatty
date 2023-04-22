import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { LoginInterface, LogoutInterface, SignUpInterface } from './interfaces';

@Controller()
export class AuthController {
  @MessagePattern({ cmd: 'signup' })
  async signup(data: SignUpInterface) {
    console.log(data);
    return 'Hello, from Auth API';
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
}
