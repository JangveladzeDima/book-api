import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsArray()
  pages: string[];
}
