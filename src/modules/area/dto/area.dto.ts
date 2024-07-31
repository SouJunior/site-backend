import { SubareaDto } from "src/modules/subarea/dto/subareas.dto";
import { ApiProperty } from '@nestjs/swagger';

export class AreaDto {
    @ApiProperty({ description: 'ID da área', example: 1 })
    id: number;

    @ApiProperty({ description: 'Nome da área', example: 'Tecnologia' })
    name: string;

    @ApiProperty({ description: 'Subáreas da área', type: [SubareaDto] })
    subareas: SubareaDto[];
}