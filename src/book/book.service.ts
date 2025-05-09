import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async getAllBooks() {
    const books = await this.prisma.book.findMany();
    return books;
  }

  async getBookById(id: string) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });
    return book;
  }

  async createBook(data: any) {
    const book = await this.prisma.book.create({
      data,
    });
    return book;
  }

  async updateBook(id: string, data: any) {
    const book = await this.prisma.book.update({
      where: { id },
      data,
    });
    return book;
  }

  async deleteBook(id: string) {
    const book = await this.prisma.book.delete({
      where: { id },
    });
    return book;
  }
}
