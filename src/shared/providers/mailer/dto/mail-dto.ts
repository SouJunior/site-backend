import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

export class DataObjectDto {
  @ApiProperty({ example: 'Antonio' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'email@dominio.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Duvida' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({
    example:
      'Como faço para poder entrar e ajudar outras pessoas na SouJunior?',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class MailDTO {
  @ApiProperty({ example: 'Reclamação' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ type: DataObjectDto })
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => DataObjectDto)
  data: DataObjectDto;
}
