import { ApiProperty } from '@nestjs/swagger';

export class SubareaDto {
    @ApiProperty({ description: 'ID da subárea', example: 1 })
    id: number;

    @ApiProperty({ description: 'Nome da subárea', example: 'Desenvolvimento de Software' })
    name: string;

    @ApiProperty({ description: 'ID da área', example: 1 })
    id_area: number;
  }
