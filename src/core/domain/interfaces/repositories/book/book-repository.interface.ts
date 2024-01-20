import { Book } from "../../../entities/book/book.entity";
import { IBaseRepository } from "../base-repository.interface";

export interface IBookRepository extends IBaseRepository<Book> {
  fetchWithReferences(id: number): Promise<Book>;

  updateBookLastReadPageId(
    bookId: number,
    lastReadPageId: number,
  ): Promise<void>;
}
