export interface SignUpInterface {
  username: string;
  email: string;
  password: string;
}

export interface LoginInterface {
  email: string;
  password: string;
}

export interface LogoutInterface {
  userId: string;
}

export interface RefreshTokenInterface {
  userId: string;
  refreshToken: string;
}

export interface VerifyTokenInterface {
  accessToken: string;
}
