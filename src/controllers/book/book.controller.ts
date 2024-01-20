import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { BookService } from "../../core/services/book.service";

@Controller("/book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async createBook(@Req() request: Request, @Body() data: CreateBookDto) {
    return this.bookService.createBook(
      { title: data.title },
      data.pages,
      (request as any).user.email,
    );
  }

  @Get("/:id")
  async fetch(@Param("id") id: number) {
    return this.bookService.fetch(id);
  }

  @Delete("/:id")
  async deleteBook(@Param("id") id: number) {
    return this.bookService.delete(id);
  }
}
