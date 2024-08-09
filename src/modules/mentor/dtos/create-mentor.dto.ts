import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class createMentorDto {
  @ApiProperty({description: 'Nome do candidato a mentor', example: 'João Silva'})
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({description: 'Email do candidato a mentor', example: 'joasilva@email.com'})
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({description: 'Link do Linkedin do candidato a mentor', example: 'https://www.linkedin.com/in/joao-silva/'})
  @IsNotEmpty()
  @IsString()
  linkedin: string;

  @ApiProperty({description: 'ID da área de interesse', example: '1'})
  @IsNotEmpty()
  @IsInt()
  id_area: number;

  @ApiProperty({description: 'ID da subarea de interesse', example: '2'})
  @IsNotEmpty()
  @IsInt()
  id_subarea: number;

  @ApiProperty({description: 'Diponibilidade do candidato a mentor', example: 'Full-time'})
  @IsNotEmpty()
  @IsString()
  availability: string;

  @ApiProperty({description: 'Indica se o candidato a mentor pode trabalhar em turnos', example: 'true'})
  @IsNotEmpty()
  @IsBoolean()
  turn: boolean;

  @ApiProperty({description: 'Opção de início do trabalho', example: 'Imediato'})
  @IsNotEmpty()
  @IsString()
  start_option: string;

  @ApiProperty({description: 'Tempo de experiencia do candidato a mentor', example: '6 meses a 1 ano'})
  @IsNotEmpty()
  @IsString()
  experience_time: string;

  @ApiProperty({description: 'O candidato descreverá sua experiencia na area', example: 'tennho experiencia de 1 ano ....'})
  @IsNotEmpty()
  @IsString()
  job_experience: string;

  @ApiProperty({description: 'O candidato descreverá sua experiencia como mentor', example: 'Sim minha experiencia envolve....'})
  @IsOptional()
  @IsString()
  mentor_experience: string;

  @ApiProperty({ description: 'Concorda em ser contatado', example: true })
  @IsNotEmpty()
  @IsBoolean()
  contact_agreement: boolean;

  @ApiProperty({ description: 'Concorda com os termos e condições', example: true })
  @IsNotEmpty()
  @IsBoolean()
  terms_agreement: boolean;

  @ApiProperty({ description: 'Data de início', example: '2024-08-01' })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  start_date: Date;
}
