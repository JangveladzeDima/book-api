import { Inject, Injectable } from "@nestjs/common";
import { IBookRepository } from "../../../domain/interfaces/repositories/book/book-repository.interface";
import { Book } from "../../../domain/entities/book/book.entity";
import { BaseRepository } from "../base.repository";
import { User } from "../../../domain/entities/user.entity";
import { BookPage } from "../../../domain/entities/book/book-page.entity";

@Injectable()
export class BookRepository
  extends BaseRepository<Book>
  implements IBookRepository
{
  constructor(
    @Inject("Book")
    private readonly book: typeof Book,
  ) {
    super(book, Book);
  }

  async fetchWithReferences(id: number): Promise<Book> {
    return this.book.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: BookPage,
          as: "pages",
        },
        {
          model: BookPage,
          as: "lastReadPage",
        },
      ],
    });
  }

  async updateBookLastReadPageId(
    bookId: number,
    lastReadPageId: number,
  ): Promise<void> {
    await this.book.update({ lastReadPageId }, { where: { id: bookId } });
  }
}
