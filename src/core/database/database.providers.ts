import { Sequelize } from "sequelize-typescript";
import { User } from "../domain/entities/user.entity";
import { Book } from "../domain/entities/book/book.entity";
import { BookPage } from "../domain/entities/book/book-page.entity";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: "postgres",
        host: "localhost",
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        logging: false,
      });
      sequelize.addModels([User, Book, BookPage]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
