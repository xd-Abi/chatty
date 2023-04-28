import {
  Controller,
  Inject,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { RegisterInterface } from './interfaces';
import { JwtSubject } from './decorators';

@Controller()
export class GatewayController {
  @Post('auth/register')
  async register(@JwtSubject() uid: string, @Body() body: RegisterInterface) {
    const pattern = { cmd: 'register' };
    const payload = {
      uid,
      ...body,
    };

    return await this.authService.send(pattern, payload).pipe(
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Get('me')
  async getMe(@JwtSubject() uid: string) {
    const pattern = { cmd: 'get-user' };
    const payload = {
      uid,
    };

    return await this.authService.send(pattern, payload).pipe(
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}
}
