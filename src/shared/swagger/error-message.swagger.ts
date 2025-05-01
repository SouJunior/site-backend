import { ApiProperty } from '@nestjs/swagger';
export class ErrorMessageSwagger {
  @ApiProperty()
  message: string;
}
