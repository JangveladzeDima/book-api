import { Inject, Injectable } from "@nestjs/common";
import { IBookPageRepository } from "../../../domain/interfaces/repositories/book/book-page-repository.interface";
import { BookPage } from "../../../domain/entities/book/book-page.entity";
import { BaseRepository } from "../base.repository";

@Injectable()
export class BookPageRepository
  extends BaseRepository<BookPage>
  implements IBookPageRepository
{
  constructor(
    @Inject("BookPage")
    private readonly bookPage: typeof BookPage,
  ) {
    super(bookPage, BookPage);
  }
}
