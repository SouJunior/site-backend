import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJuniorDto {
  @ApiProperty({ description: 'Nome do candidato', example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email do candidato',
    example: 'joao.silva@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Telefone do candidato',
    example: '(31) 91234-5678',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Este número possui WhatsApp?', example: true })
  @IsBoolean()
  hasWhatsApp: boolean;

  @ApiProperty({
    description: 'Perfil do LinkedIn do candidato',
    example: 'https://www.linkedin.com/in/joao-silva/',
  })
  @IsString()
  @IsNotEmpty()
  linkedin: string;

  @ApiProperty({ description: 'ID da área de interesse', example: 1 })
  @IsInt()
  area: number;

  @ApiProperty({ description: 'ID da subárea de interesse', example: 1 })
  @IsInt()
  subarea: number;

  @ApiProperty({
    description: 'Disponibilidade do candidato',
    example: 'Full-time',
  })
  @IsString()
  @IsNotEmpty()
  availability: string;

  @ApiProperty({
    description: 'Indica se o candidato pode trabalhar em turnos',
    example: true,
  })
  @IsBoolean()
  turn: boolean;

  @ApiProperty({
    description: 'Indica se o candidato foi indicado por alguém da SJ',
    example: true,
  })
  @IsBoolean()
  indication: boolean;

  @ApiProperty({
    description: 'Linkedin de quem o indicou',
    example: 'https://www.linkedin.com/in/t-monteiro/',
    required: false,
  })
  @IsOptional()
  @IsString()
  linkedinIndication?: string;

  @ApiProperty({
    description: 'Opção de início do trabalho',
    example: 'Imediato',
  })
  @IsString()
  @IsNotEmpty()
  startOption: string;

  @ApiProperty({
    description: 'Conhecimento em ferramentas',
    example: 'Excel, Power BI',
    required: false,
  })
  @IsOptional()
  @IsString()
  toolsKnowledge?: string;

  @ApiProperty({
    description: 'Conhecimento em campo específico',
    example: 'Marketing Digital',
    required: false,
  })
  @IsOptional()
  @IsString()
  fieldKnowledge?: string;

  @ApiProperty({
    description: 'Motivação para trabalho voluntário',
    example: 'Quero ganhar experiência',
    required: false,
  })
  @IsOptional()
  @IsString()
  volunteerMotivation?: string;

  @ApiProperty({ description: 'Concorda em ser contatado', example: true })
  @IsBoolean()
  contactAgreement: boolean;

  @ApiProperty({
    description: 'Concorda com os termos e condições',
    example: true,
  })
  @IsBoolean()
  termsAgreement: boolean;

  @ApiProperty({ description: 'Data de início', example: '2024-08-01' })
  @IsDate()
  @Type(() => Date)
  startDate: Date;
}
