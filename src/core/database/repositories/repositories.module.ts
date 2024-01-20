import { Module } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "../../domain/entities/user.entity";
import { Book } from "../../domain/entities/book/book.entity";
import { BookPage } from "../../domain/entities/book/book-page.entity";
import { BookRepository } from "./book/book.repository";
import { BookPageRepository } from "./book/book-page.repository";

@Module({
  imports: [],
  providers: [
    { provide: "User", useValue: User },
    { provide: "Book", useValue: Book },
    { provide: "BookPage", useValue: BookPage },

    { provide: "UserRepository", useClass: UserRepository },
    { provide: "BookRepository", useClass: BookRepository },
    { provide: "BookPageRepository", useClass: BookPageRepository },
  ],
  exports: ["UserRepository", "BookRepository", "BookPageRepository"],
})
export class RepositoriesModule {}
