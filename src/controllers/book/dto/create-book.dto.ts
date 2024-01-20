import { IsArray, IsDefined, IsString } from "class-validator";

export class CreateBookDto {
  @IsString()
  @IsDefined()
  title: string;

  @IsArray()
  @IsDefined()
  pages: string[];
}
