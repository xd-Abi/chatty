import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const JwtSubject = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return null;
    }
    const token = authHeader.replace('Bearer ', '');
    const decoded: any = jwt.decode(token);
    if (!decoded) {
      return null;
    }
    return decoded.sub;
  },
);
