import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1];
    const isValidToken = firstValueFrom(
      await this.authService.send(
        { cmd: 'verify-token' },
        { accessToken: token },
      ),
    );

    return isValidToken;
  }

  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}
}
