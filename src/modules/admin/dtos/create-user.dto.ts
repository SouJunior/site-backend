import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDate
} from 'class-validator';
import { Type } from 'class-transformer';

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
  @Type(() => Date)
  email_confirmed_at?: Date;


  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  created_at: Date = new Date();

  constructor(partial: Partial<CreateUserDto>) {
    Object.assign(this, partial);
    if (!this.created_at) {
      this.created_at = new Date();
    }
  }
}
