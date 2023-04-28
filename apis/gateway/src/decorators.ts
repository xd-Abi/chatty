import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import axios from 'axios';

export const JwtSubject = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return null;
    }

    try {
      const result = await axios.get(
        `https://${process.env.AUTH0_DOMAIN}/userinfo`,
        {
          headers: {
            Authorization: `${authHeader}`,
          },
        },
      );

      const rawSub = result.data.sub;
      const sub = rawSub.substring(rawSub.indexOf('|') + 1);

      return sub;
    } catch (error) {
      console.error(error);
    }

    return null;
  },
);
