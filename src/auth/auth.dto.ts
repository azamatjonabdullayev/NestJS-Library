import { Roles } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  password!: string;
}

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 15)
  password!: string;

  @IsNotEmpty()
  @IsEnum(Roles, { message: 'Invalid role' })
  role!: Roles;
}
