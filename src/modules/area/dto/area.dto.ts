import { SubareaDto } from "src/modules/subarea/dto/subareas.dto"; 

export class AreaDto {
    id: number;
    name: string;
    subareas: SubareaDto[];

    constructor(
        id: number,
        name: string,
        subareas: SubareaDto[]
    ) {
        this.id = id;
        this.name = name;
        this.subareas = subareas;
    }
}