import { NotFoundException } from "@nestjs/common";

export class BookNotFound extends NotFoundException {
  constructor(id: number) {
    super(`Book with ${id} not found`);
  }
}
