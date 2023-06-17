import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';

export class MailDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subject: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  template: string;

  @ApiProperty()
  @IsObject()
  @IsNotEmpty()
  data: {
    [key: string]: string;
  };
}
