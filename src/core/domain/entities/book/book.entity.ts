import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import { BookPage } from "./book-page.entity";
import { User } from "../user.entity";

@Table({
  tableName: "books",
})
export class Book extends Model {
  @Column
  title: string;

  @ForeignKey(() => BookPage)
  @Column
  lastReadPageId: number;

  @BelongsTo(() => BookPage, { onDelete: "SET NULL" })
  lastReadPage: BookPage;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => BookPage, { onDelete: "CASCADE" })
  pages: BookPage[];
}
