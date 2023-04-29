import {
  Controller,
  Inject,
  Post,
  Get,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError } from 'rxjs/operators';
import { AddFriendInterface, RegisterInterface } from './interfaces';
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

    return await this.userService.send(pattern, payload).pipe(
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

    return await this.userService.send(pattern, payload).pipe(
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Get('friends')
  async getFriends(@JwtSubject() uid: string) {
    const pattern = { cmd: 'get-friends' };
    const payload = {
      uid,
    };

    return await this.friendService.send(pattern, payload).pipe(
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Get('friends-requests')
  async getFriendsRequests(@JwtSubject() uid: string) {
    const pattern = { cmd: 'get-friends-requests' };
    const payload = {
      uid,
    };

    return await this.friendService.send(pattern, payload).pipe(
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Post('friends-requests')
  async sendFriendRequest(
    @JwtSubject() uid: string,
    @Body() body: AddFriendInterface,
  ) {
    const pattern = { cmd: 'add-friend' };
    const payload = {
      uid,
      recipient: body.recipient,
    };

    return await this.friendService.send(pattern, payload).pipe(
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Post('friend/accept/:id')
  async acceptFriendRequest(@JwtSubject() uid: string, @Param() params: any) {
    const pattern = { cmd: 'accept-friend' };
    const payload = {
      uid,
      id: params.id,
    };

    return await this.friendService.send(pattern, payload).pipe(
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  @Post('friend/reject/:id')
  async rejectFriendRequest(@JwtSubject() uid: string, @Param() params: any) {
    const pattern = { cmd: 'reject-friend' };
    const payload = {
      uid,
      id: params.id,
    };

    return await this.friendService.send(pattern, payload).pipe(
      catchError((error) => {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }),
    );
  }

  constructor(
    @Inject('AUTH_SERVICE') private userService: ClientProxy,
    @Inject('AUTH_SERVICE') private friendService: ClientProxy,
  ) {}
}
