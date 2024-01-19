import { Module } from '@nestjs/common';
import { databaseProviders } from "./providers/database.providers";

@Module({
  imports: [],
  providers: [...databaseProviders],
  exports: []
})
export class AppModule {
}
