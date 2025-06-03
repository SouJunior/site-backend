import { ApiProperty } from '@nestjs/swagger';

export class AreaDto {
    @ApiProperty({ description: 'ID da área', example: 1 })
    id: number;

    @ApiProperty({ description: 'Nome da área', example: 'Tecnologia' })
    name: string;


    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}