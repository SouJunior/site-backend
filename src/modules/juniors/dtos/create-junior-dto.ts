import { IsBoolean, IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CrearteJuniorDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    linkedin: string;

    @IsInt()
    id_area: number;

    @IsInt()
    id_subarea: number;

    @IsString()
    @IsNotEmpty()
    availability: string;

    @IsBoolean()
    turn: boolean;

    @IsString()
    @IsNotEmpty()
    start_option: string;

    @IsOptional()
    @IsString()
    tools_knowledge?: string;

    @IsOptional()
    @IsString()
    field_knowledge?: string;

    @IsOptional()
    @IsString()
    volunteer_motivation?: string;

    @IsBoolean()
    contact_agreement: boolean;

    @IsBoolean()
    terms_agreement: boolean;

    @IsDate()
    start_date: Date;
}