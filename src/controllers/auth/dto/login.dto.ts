import { IsDefined, IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
