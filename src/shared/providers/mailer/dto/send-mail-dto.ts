import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendMailDto {
  @ApiProperty({ example: 'Antonio' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Toin' })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ example: '1111111111' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'email@dominio.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Gostaria de poder fazer parte desse projeto' })
  @IsString()
  @IsNotEmpty()
  description: string;
}
