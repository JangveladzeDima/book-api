import { Controller, Get } from '@nestjs/common';

@Controller('/book')
export class BookController {
  @Get('/')
  async get() {
    return 'Hello';
  }
}
