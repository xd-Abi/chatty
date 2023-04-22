import {
  Controller,
  Inject,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import {
  LoginInterface,
  RefreshTokenInterface,
  SignUpInterface,
} from './interfaces';
import { Protected } from 'src/decorators/protected';
import { JwtSubject } from 'src/decorators/jwt-subject';

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

  @Protected()
  @Post('auth/logout')
  async logout(@JwtSubject() userId: string) {
    const pattern = { cmd: 'logout' };
    const payload = { userId };

    return await this.authService.send(pattern, payload).pipe(
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Post('auth/refresh-token')
  async refreshToken(@Body() body: RefreshTokenInterface) {
    const pattern = { cmd: 'refresh-token' };
    const payload = body;

    return await this.authService.send(pattern, payload).pipe(
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}
}
