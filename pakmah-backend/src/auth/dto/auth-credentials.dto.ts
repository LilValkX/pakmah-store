import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  password: string;
}

export class SigninDto {
  @IsString()
  name: string;

  @IsString()
  password: string;
}
