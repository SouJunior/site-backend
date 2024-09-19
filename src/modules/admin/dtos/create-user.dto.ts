import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  encrypted_password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  email_confirmed_at?: Date;

}
