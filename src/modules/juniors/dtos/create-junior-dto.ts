import { IsBoolean, IsDate, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateJuniorDto {
  @ApiProperty({ description: 'Nome do candidato', example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Email do candidato', example: 'joao.silva@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Perfil do LinkedIn do candidato', example: 'https://www.linkedin.com/in/joao-silva/' })
  @IsString()
  @IsNotEmpty()
  linkedin: string;

  @ApiProperty({ description: 'ID da área de interesse', example: 1 })
  @IsInt()
  id_area: number;

  @ApiProperty({ description: 'Disponibilidade do candidato', example: 'Full-time' })
  @IsString()
  @IsNotEmpty()
  availability: string;

  @ApiProperty({ description: 'Indica se o candidato pode trabalhar em turnos', example: true })
  @IsBoolean()
  turn: boolean;

  @ApiProperty({ description: 'Opção de início do trabalho', example: 'Imediato' })
  @IsString()
  @IsNotEmpty()
  start_option: string;

  @ApiProperty({ description: 'Conhecimento em ferramentas', example: 'Excel, Power BI', required: false })
  @IsOptional()
  @IsString()
  tools_knowledge?: string;

  @ApiProperty({ description: 'Conhecimento em campo específico', example: 'Marketing Digital', required: false })
  @IsOptional()
  @IsString()
  field_knowledge?: string;

  @ApiProperty({ description: 'Motivação para trabalho voluntário', example: 'Quero ganhar experiência', required: false })
  @IsOptional()
  @IsString()
  volunteer_motivation?: string;

  @ApiProperty({ description: 'Concorda em ser contatado', example: true })
  @IsBoolean()
  contact_agreement: boolean;

  @ApiProperty({ description: 'Concorda com os termos e condições', example: true })
  @IsBoolean()
  terms_agreement: boolean;

  @ApiProperty({ description: 'Data de início', example: '2024-08-01' })
  @IsDate()
  @Type(() => Date)
  start_date: Date;
}
