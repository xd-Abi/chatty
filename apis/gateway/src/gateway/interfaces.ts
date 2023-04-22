import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SignUpInterface {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}

export class LoginInterface {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
