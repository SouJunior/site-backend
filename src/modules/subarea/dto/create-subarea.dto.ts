import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateSubareaDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    id_area: number;

    @IsInt()
    id: number;
}