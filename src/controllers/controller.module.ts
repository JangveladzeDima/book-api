import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { ServiceModule } from '../core/services/service.module';
import { BookController } from './book/book.controller';
import { AuthenticateMiddleware } from './middlewares/authenticate.middleware';

@Module({
  imports: [ServiceModule],
  controllers: [AuthController, BookController],
})
export class ControllerModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthenticateMiddleware).forRoutes(BookController);
  }
}
