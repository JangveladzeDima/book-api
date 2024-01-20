import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RepositoriesModule } from "../database/repositories/repositories.module";
import { AuthTokenService } from "./auth-token.service";
import { BookService } from "./book.service";

@Module({
  imports: [RepositoriesModule],
  providers: [
    { provide: "AuthTokenService", useClass: AuthTokenService },

    AuthService,
    BookService,
  ],
  exports: [
    { provide: "AuthTokenService", useClass: AuthTokenService },

    AuthService,
    BookService,
  ],
})
export class ServiceModule {}
