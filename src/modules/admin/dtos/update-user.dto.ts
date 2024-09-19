import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  encrypted_password?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  role?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;
}
