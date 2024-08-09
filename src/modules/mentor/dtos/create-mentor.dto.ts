import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class createMentorDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  linkedin: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  area: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  subarea: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  availability: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  turn: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  start_option: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  job_experience: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  mentor_experience: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  volunteer_motivation: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  contact_agreement: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  terms_agreement: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  inicio: Date;
}
