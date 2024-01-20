import { BookPage } from "../../../entities/book/book-page.entity";
import { IBaseRepository } from "../base-repository.interface";

export interface IBookPageRepository extends IBaseRepository<BookPage> {
  deleteByBookId(bookId: number): Promise<void>;
}
