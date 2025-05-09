import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { Roles, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async registerUser({
    name,
    email,
    password,
    role,
  }: RegisterDTO): Promise<{ message: string; token: string }> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as Roles,
      },
    });

    const token = this.jwt.sign({
      ...newUser,
      password: undefined,
    });

    return { message: 'User created successfully', token };
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }

  async loginUser({
    email,
    password,
  }: LoginDTO): Promise<{ message: string; token: string }> {
    const validate = await this.validateUser(email, password);
    if (!validate) throw new BadRequestException('Invalid credentials');

    const token = await this.jwt.sign({
      ...validate,
      password: undefined,
    });

    return {
      message: 'User logged in successfully',
      token,
    };
  }
}
