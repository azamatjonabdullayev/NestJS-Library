import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';
import { BorrowsModule } from './borrows/borrows.module';

@Module({
  imports: [AuthModule, UserModule, BookModule, BorrowsModule],
})
export class AppModule {}
