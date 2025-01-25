import { IsBoolean,  IsDate, IsEmail,  IsInt, IsNotEmpty,  IsOptional, IsString, Matches, MinDate } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateHeadDTO{

    @ApiProperty({description: 'Nome do Head', example:"Jonatas Estrela"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: 'Email do Head', example: 'joestar@spdwgn.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({description: 'LinkedIn do Head', example: 'https://www.linkedin.com/in/jjoestar/'})
    @IsString()
    @IsNotEmpty()
    @Matches(/^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9\-]+\/?$/, {  message: 'URL do LinkedIn inválida' })
    linkedin: string;

    @ApiProperty({description: 'Disponibilidade de atuação noturna', example: true})
    @IsBoolean()
    turn: boolean;

    @ApiProperty({description: 'Disponibilidade do Head', example:'5 a 10 horas'})
    @IsString()
    @IsNotEmpty()
    availability: string;

    @ApiProperty({description: 'Disponibilidade de atuação Imediata', example:'Imediato'})
    @IsString()
    @IsNotEmpty()
    startOption: string;

    @ApiProperty({description:'Data de Início. Se não constar, é imediatamente.', example: '2025-01-12'})
    @IsDate()
    @IsOptional()
    @MinDate(new Date(), { message: 'Data de início deve ser futura' })
    startDate?: Date;

    @ApiProperty({description:'Área de atuação codificada por um ID inteiro', example: 3})
    @IsInt()
    area: number;

    @ApiProperty({description:'Sub-área de atuação codificada por um ID inteiro', example: 4})
    @IsInt()
    @IsOptional()
    subarea?: number;

    @ApiProperty({description:'Tempo de atuação no mercado de trabalho', example: '3 a 6 anos'})
    @IsString()
    @IsNotEmpty()
    experienceTime: string;

    @ApiProperty({description:'Experiência descrita da função desempenhada', example: 'Atuei como CEO na Fundação Speedwagon'})
    @IsString()
    @IsNotEmpty()
    jobExperience: string;

    @ApiProperty({description:'Motivação para se tornar um Head', example: 'Quero ser uma boa influência na próxima geração de devs'})
    @IsString()
    @IsNotEmpty()
    volunteerMotivation: string;

    @ApiProperty({description:'Informações adicionais do candidato a Head', example: 'Sou excepcional em identificação de Oportunidades e também sou pós-graduado em TI'})
    @IsString()
    @IsOptional()
    otherExperiences?: string;

    @ApiProperty({description:'Concorda em ser contatado', example: true})
    @IsBoolean()
    contactAgreement: boolean;

    @ApiProperty({description:'Concorda em ser voluntário', example: true})
    @IsBoolean()
    volunteerAgreement: boolean;

    @ApiProperty({description:'Se colabora na estruturação estratégica da área de atuação', example: true})
    @IsBoolean()
    collaboration: boolean;

    @ApiProperty({description:'Concorda com os termos e condições', example: true})
    @IsBoolean()
    termsAgreement: boolean;

}