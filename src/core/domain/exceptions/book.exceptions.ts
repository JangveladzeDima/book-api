import { NotFoundException } from "@nestjs/common";

export class BookNotFound extends NotFoundException {
  constructor(id: number) {
    super(`Book with ${id} not found`);
  }
}

export class BookPageNotFound extends NotFoundException {
  constructor(id: number) {
    super(`Book page with ${id} not found`);
  }
}
