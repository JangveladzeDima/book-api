import { Inject, Injectable } from "@nestjs/common";
import { Book } from "../domain/entities/book/book.entity";
import { BookPage } from "../domain/entities/book/book-page.entity";
import { User } from "../domain/entities/user.entity";
import { IBookRepository } from "../domain/interfaces/repositories/book/book-repository.interface";
import { IBookPageRepository } from "../domain/interfaces/repositories/book/book-page-repository.interface";
import { IUserRepository } from "../domain/interfaces/repositories/user-repository.interface";
import { BookNotFound } from "../domain/exceptions/book.exceptions";

@Injectable()
export class BookService {
  constructor(
    @Inject("BookRepository")
    private readonly bookRepository: IBookRepository,
    @Inject("BookPageRepository")
    private readonly bookPageRepository: IBookPageRepository,
    @Inject("UserRepository")
    private readonly userRepository: IUserRepository,
  ) {}

  async createBook(
    book: Partial<Book>,
    bookPagesContent: string[],
    userEmail: string,
  ) {
    const user = await this.userRepository.fetchByEmail(userEmail);

    const bookEntity = await this.bookRepository.save({
      ...book,
      userId: user.id,
    });

    await Promise.all(
      bookPagesContent.map((content, index) => {
        return this.bookPageRepository.save({
          content,
          pageNumber: index + 1,
          bookId: bookEntity.id,
        });
      }),
    );

    return this.bookRepository.fetchWithReferences(bookEntity.id);
  }

  async fetch(id: number) {
    const book = await this.bookRepository.fetchWithReferences(id);

    if (!book) {
      throw new BookNotFound(id);
    }

    return book;
  }

  async delete(id: number) {
    const book = await this.bookRepository.fetch(id);

    if (!book) {
      throw new BookNotFound(id);
    }

    await this.bookRepository.delete(id);
  }
}
