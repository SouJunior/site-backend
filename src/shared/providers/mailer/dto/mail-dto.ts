import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class DataObjectDto {
  @ApiProperty({ example: 'Antonio' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'email@dominio.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Duvida' })
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    example:
      'Como faço para poder entrar e ajudar outras pessoas na SouJunior?',
  })
  @IsNotEmpty()
  description: string;
}

export class MailDTO {
  @ApiProperty({ example: 'Reclamação' })
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty({ type: DataObjectDto })
  @IsObject()
  @IsNotEmpty()
  data: DataObjectDto;
}
