import { CanActivate, ExecutionContext } from '@nestjs/common';
import axios from 'axios';

export class Auth0Guard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.getArgByIndex(0);
    const authHeader = req.headers.authorization;

    try {
      await axios.get(`${this.prepareIssuer()}/userinfo`, {
        headers: {
          Authorization: `${authHeader}`,
        },
      });

      return true;
    } catch (error) {
      console.error(error);
    }

    return false;
  }

  private prepareIssuer = () => {
    return `https://${process.env.AUTH0_DOMAIN}`;
  };

  constructor() {}
}
