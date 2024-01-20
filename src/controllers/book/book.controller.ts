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
  Patch,
} from "@nestjs/common";
import { CreateBookDto } from "./dto/create-book.dto";
import { BookService } from "../../core/services/book.service";
import { UpdateLastReadPageDto } from "./dto/update-last-read-page.dto";
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";
import { UpdateBookDto } from "./dto/update-book.dto";

@Controller("/book")
@ApiForbiddenResponse({ description: "Return If User Not Authorized" })
@ApiTags("Book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiCreatedResponse({ description: "Create Book And Book Pages" })
  @ApiBadRequestResponse({ description: "Return If Data Not Valid" })
  @ApiOperation({ summary: "Create Book" })
  @Post()
  async createBook(@Req() request: any, @Body() data: CreateBookDto) {
    return this.bookService.createBook(
      { title: data.title },
      data.pages,
      (request as any).user.email,
    );
  }

  @ApiOkResponse({ description: "Return Book By Id" })
  @ApiNotFoundResponse({ description: "Return Then Book With Id Not Found" })
  @ApiBadRequestResponse({ description: "Return If Data Not Valid" })
  @ApiOperation({ summary: "Get Book With References" })
  @Get("/:id")
  async fetch(@Param("id") id: number) {
    return this.bookService.fetch(id);
  }

  @ApiOkResponse({ description: "Return Books By PageIndex and PageSize" })
  @ApiBadRequestResponse({ description: "Return If Data Not Valid" })
  @ApiOperation({ summary: "Load Books" })
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
  @ApiBadRequestResponse({ description: "Return If Data Not Valid" })
  @ApiOperation({ summary: "Update Last Read Page Field" })
  @Put("/:bookId/last-read-page")
  async updateLastReadPage(
    @Param("bookId") bookId: number,
    @Body() data: UpdateLastReadPageDto,
  ) {
    return this.bookService.updatePageLastReadBook(bookId, data.pageId);
  }

  @ApiOkResponse({ description: "Return Then Book Updated" })
  @ApiNotFoundResponse({ description: "Return If Book Not Found" })
  @ApiBadRequestResponse({ description: "Return If Data Not Valid" })
  @ApiOperation({ summary: "Update Book" })
  @Patch("/:id")
  async updateBook(@Param("id") id: number, @Body() data: UpdateBookDto) {
    return this.bookService.updateBook(id, { title: data?.title }, data?.pages);
  }

  @ApiOkResponse({ description: "Return Then Book Delete Finish Successful" })
  @ApiNotFoundResponse({ description: "Return Then Not Found Book" })
  @ApiBadRequestResponse({ description: "Return If Data Not Valid" })
  @ApiOperation({ summary: "Delete Book" })
  @Delete("/:id")
  async deleteBook(@Param("id") id: number) {
    return this.bookService.delete(id);
  }
}
