import { IsDefined, IsInt } from "class-validator";

export class UpdateLastReadPageDto {
  @IsInt()
  @IsDefined()
  pageId: number;
}
