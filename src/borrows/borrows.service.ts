import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BorrowsService {
  constructor(private prisma: PrismaService) {}

  async getAllBorrows() {
    return await this.prisma.borrow.findMany({
      include: {
        book: true,
        user: true,
      },
    });
  }

  async getByUserId(id: string) {
    return await this.prisma.borrow.findMany({
      where: {
        userId: id,
      },
      include: {
        book: true,
        user: true,
      },
    });
  }

  async createBorrow({
    bookId,
    userId,
    returnDate,
  }: {
    bookId: string;
    userId: string;
    returnDate: Date;
  }) {
    return await this.prisma.borrow.create({
      data: {
        bookId,
        userId,
        returnDate,
      },
    });
  }
}
