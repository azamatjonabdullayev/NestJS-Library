import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BorrowsService } from './borrows.service';

@Controller('borrows')
export class BorrowsController {
  constructor(private readonly borrowsService: BorrowsService) {}

  @Get()
  async getAllBorrows() {
    return await this.borrowsService.getAllBorrows();
  }

  @Get(':id')
  async getByUserId(@Param('id') id: string) {
    return await this.borrowsService.getByUserId(id);
  }

  @Post()
  async createBorrow(
    @Body() body: { bookId: string; userId: string; returnDate: Date },
  ) {
    return await this.borrowsService.createBorrow(body);
  }
}
