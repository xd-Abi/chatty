import { CanActivate, ExecutionContext } from '@nestjs/common';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
var { expressjwt: jwt } = require('express-jwt');

export class Auth0Guard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const checkJwt = promisify(
      jwt({
        secret: this.prepareSecret(),
        audience: this.prepareAudience(),
        issuer: this.prepareIssuer(),
        algorithms: ['RS256'],
      }),
    );

    try {
      const req = context.getArgByIndex(0);
      const res = context.getArgByIndex(1);
      await checkJwt(req, res);
      return true;
    } catch (err) {
      console.error(err);
    }

    return true;
  }

  private prepareIssuer = () => {
    return `https://${process.env.AUTH0_DOMAIN}/`;
  };

  private prepareAudience = () => {
    return process.env.AUTH0_AUDIENCE;
  };

  private prepareSecret = () => {
    const jwksUri = `${this.prepareIssuer()}.well-known/jwks.json`;
    return expressJwtSecret({
      cache: true,
      jwksUri: jwksUri,
      jwksRequestsPerMinute: 5,
      rateLimit: true,
    });
  };

  constructor() {}
}
