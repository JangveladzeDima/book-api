import { Book } from "../../../entities/book/book.entity";
import { IBaseRepository } from "../base-repository.interface";
import { Search } from "../../../../../utils";

export interface IBookRepository extends IBaseRepository<Book> {
  fetchWithReferences(id: number): Promise<Book>;

  updateBookLastReadPageId(
    bookId: number,
    lastReadPageId: number,
  ): Promise<void>;

  update(id: number, updateData: Partial<Book>): Promise<void>;

  load(search: Search): Promise<Book[]>;
}
