import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RepositoriesModule } from "../database/repositories/repositories.module";
import { AuthTokenService } from "./auth-token.service";

@Module({
  imports: [RepositoriesModule],
  providers: [
    { provide: "AuthTokenService", useClass: AuthTokenService },
    AuthService,
  ],
  exports: [
    { provide: "AuthTokenService", useClass: AuthTokenService },

    AuthService,
  ],
})
export class ServiceModule {}
