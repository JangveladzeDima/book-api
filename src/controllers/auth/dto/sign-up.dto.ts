import { IsDefined, IsEmail, IsString } from "class-validator";

export class SignUpDto {
  @IsString()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @IsDefined()
  nickname: string;

  @IsString()
  @IsDefined()
  password: string;
}
