import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class RegisterInterface {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;
}

export class AddFriendInterface {
  @IsString()
  @IsNotEmpty()
  recipient: string;
}
