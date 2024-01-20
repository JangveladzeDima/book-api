import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Book } from "./book.entity";

@Table({
  tableName: "bookPages",
})
export class BookPage extends Model {
  @Column
  content: string;

  @Column
  pageNumber: number;

  @ForeignKey(() => Book)
  @Column
  bookId: number;

  @BelongsTo(() => Book)
  book: Book;
}
