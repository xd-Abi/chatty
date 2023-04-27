/**
 * @packageDocumentation
 * @module Gateway-Guards
 */

import { getEnvironmentVariable } from '@chatty/utils';
import { CanActivate, ExecutionContext, ValidationPipe } from '@nestjs/common';
import { expressJwtSecret } from 'jwks-rsa';
import { promisify } from 'util';
var { expressjwt: jwt } = require('express-jwt');

/**
 * This class is an implementation of the CanActivate interface for an Auth0 guard that
 * verifies JWT tokens in incoming requests.
 */
export class Auth0Guard implements CanActivate {
  /**
   * This method checks if the incoming request contains a valid JWT token.
   *
   * @param context - The execution context of the incoming request.
   * @returns A boolean indicating whether the request contains a valid JWT token.
   */
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
    } catch (err) {}

    return false;
  }

  /**
   * This method prepares the issuer for the JWT token by retrieving
   * the AUTH0_DOMAIN environment variable.
   *
   * @returns The issuer for the JWT token.
   */
  private prepareIssuer = () => {
    return `https://${getEnvironmentVariable('AUTH0_DOMAIN')}/`;
  };

  /**
   * This method prepares the audience for the JWT token by retrieving
   * the AUTH0_AUDIENCE environment variable.
   *
   * @returns The audience for the JWT token.
   */
  private prepareAudience = () => {
    return getEnvironmentVariable('AUTH0_AUDIENCE');
  };

  /**
   * This method prepares the secret for the JWT token by retrieving the
   * jwksUri from the issuer and using it to create an expressJwtSecret function.
   *
   * @returns The secret for the JWT token.
   */
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
