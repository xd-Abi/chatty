import { Controller, Inject, Post, Body } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { LoginInterface, SignUpInterface } from './interfaces';

@Controller()
export class GatewayController {
  @Post('auth/signup')
  async signup(@Body() body: SignUpInterface) {
    const pattern = { cmd: 'signup' };
    const payload = body;
    return this.authService.send(pattern, payload);
  }

  @Post('auth/login')
  async login(body: LoginInterface) {
    const pattern = { cmd: 'login' };
    const payload = body;
    return this.authService.send(pattern, payload);
  }

  @Post('auth/logout')
  async logout() {
    const pattern = { cmd: 'signup' };
    const payload = {};
    return this.authService.send(pattern, payload);
  }

  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}
}
