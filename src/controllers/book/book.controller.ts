import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { BookService } from "../../core/services/book.service";
import { UpdateLastReadPageDto } from "./dto/update-last-read-page.dto";
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from "@nestjs/swagger";

@Controller("/book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiCreatedResponse({ description: "Create Book And Book Pages" })
  @Post()
  async createBook(@Req() request: Request, @Body() data: CreateBookDto) {
    return this.bookService.createBook(
      { title: data.title },
      data.pages,
      (request as any).user.email,
    );
  }

  @ApiOkResponse({ description: "Return Book By Id" })
  @ApiNotFoundResponse({ description: "Return Then Book With Id Not Found" })
  @Get("/:id")
  async fetch(@Param("id") id: number) {
    return this.bookService.fetch(id);
  }

  @ApiOkResponse({ description: "Return Books By PageIndex and PageSize" })
  @Get()
  async load(
    @Query("pageIndex") pageIndex?: string,
    @Query("pageSize") pageSize?: string,
  ) {
    return this.bookService.load(parseInt(pageIndex), parseInt(pageSize));
  }

  @ApiOkResponse({
    description: "Return Then Set Last Read Page Finish Successful",
  })
  @ApiNotFoundResponse({ description: "Return Then Not Found Book Or Page" })
  @Put("/:bookId/last-read-page")
  async updateLastReadPage(
    @Param("bookId") bookId: number,
    @Body() data: UpdateLastReadPageDto,
  ) {
    return this.bookService.updatePageLastReadBook(bookId, data.pageId);
  }

  @ApiOkResponse({ description: "Return Then Book Delete Finish Successful" })
  @ApiNotFoundResponse({ description: "Return Then Not Found Book" })
  @Delete("/:id")
  async deleteBook(@Param("id") id: number) {
    return this.bookService.delete(id);
  }
}
