import {
  Controller,
  Inject,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map } from 'rxjs/operators';
import { LoginInterface, SignUpInterface } from './interfaces';

@Controller()
export class GatewayController {
  @Post('auth/signup')
  async signup(@Body() body: SignUpInterface) {
    const pattern = { cmd: 'signup' };
    const payload = body;

    return await this.authService.send(pattern, payload).pipe(
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Post('auth/login')
  async login(@Body() body: LoginInterface) {
    const pattern = { cmd: 'login' };
    const payload = body;

    return await this.authService.send(pattern, payload).pipe(
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Post('auth/logout')
  async logout() {
    const pattern = { cmd: 'signup' };
    const payload = {};
    return this.authService.send(pattern, payload);
  }

  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}
}
