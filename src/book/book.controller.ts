import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BookService } from './book.service';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Get()
  async getAllBooks() {
    const books = await this.bookService.getAllBooks();
    return books;
  }

  @Get(':id')
  async getBookById(@Param('id') id: string) {
    const book = await this.bookService.getBookById(id);
    return book;
  }

  @Post()
  async createBook(@Body() data: any) {
    const book = await this.bookService.createBook(data);
    return book;
  }

  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() data: any) {
    const book = await this.bookService.updateBook(id, data);
    return book;
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    const book = await this.bookService.deleteBook(id);
    return book;
  }
}
