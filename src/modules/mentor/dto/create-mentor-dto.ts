import { IsBoolean,  IsDate, IsEmail,  IsInt, IsNotEmpty,  IsOptional, IsString, IsUrl } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMentorDTO{

    @ApiProperty({description: 'Nome do Mentor', example:"Jadson Vasconcelos"})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: 'Email do Mentor', example: 'jadsonvascon@shodan.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({description: 'LinkedIn do Mentor', example: 'https://www.linkedin.com/in/jadsonVas/'})
    @IsString()
    @IsNotEmpty()
    @IsUrl({  
        protocols: ['http', 'https'],  
        require_protocol: true,
      })
    linkedin: string;

    @ApiProperty({description:'Foi indicado por alguém da SJ', example: true})
    @IsBoolean()
    indication: boolean;

    @ApiProperty({description: 'LinkedIn do Indicante', example: 'https://www.linkedin.com/in/tMonteiro/'})
    @IsString()
    @IsNotEmpty()
    @IsUrl({  
        protocols: ['http', 'https'],  
        require_protocol: true,
      })
    linkedinIndication: string;

    @ApiProperty({description: 'Disponibilidade de atuação noturna', example: true})
    @IsBoolean()
    turn: boolean;

    @ApiProperty({description: 'Disponibilidade do Mentor', example:'5 a 10 horas'})
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

    @ApiProperty({description:'Experiência descrita da função desempenhada', example: 'Atuei como Tech Lead nas indústrias Vault Tech'})
    @IsString()
    @IsNotEmpty()
    jobExperience: string;

    @ApiProperty({description:'Motivação para se tornar um mentor', example: 'Quero ser uma boa influência na próxima geração de devs'})
    @IsString()
    @IsNotEmpty()
    volunteerMotivation: string;

    @ApiProperty({description:'Informações adicionais do candidato a Mentor', example: 'Sou excepcional em identificação de Oportunidades e também sou pós-graduado em TI'})
    @IsString()
    @IsOptional()
    otherExperiences?: string;

    @ApiProperty({description:'Concorda em ser contatado', example: true})
    contactAgreement: boolean;

    @ApiProperty({description:'Concorda em ser voluntário', example: true})
    volunteeringAgreement: boolean;

    @ApiProperty({description:'Concorda com os termos e condições', example: true})
    termsAgreement: boolean;

}