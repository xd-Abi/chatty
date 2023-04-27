/**
 * @packageDocumentation
 * @module Common-Interfaces
 */

export interface User {
  uid: string;
  username: string;
  email: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  username: string;
  email: string;
  password: string;
}

export interface AuthSuccessResponse {
  accessToken: string;
  refreshToken: string;
}

export interface VerifyAccessTokenParams {
  accessToken: string;
}

export interface RefreshAccessTokenParams {
  refreshToken: string;
}
