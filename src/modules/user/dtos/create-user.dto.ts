import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  ip?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  mailConfirm: boolean;

  @ApiProperty()
  @IsOptional()
  recoverPasswordToken?: string;
}
