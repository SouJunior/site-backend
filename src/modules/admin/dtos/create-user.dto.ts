import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  encrypted_password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  role: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  instance_id?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  aud?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  email_confirmed_at?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  invited_at?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  confirmation_token?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  confirmation_sent_at?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  recovery_token?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  recovery_sent_at?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email_change_token_new?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email_change?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  email_change_sent_at?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  last_sign_in_at?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  raw_app_meta_data?: Record<string, any>;

  @ApiProperty({ required: false })
  @IsOptional()
  raw_user_meta_data?: Record<string, any>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  is_super_admin?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  phone_confirmed_at?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone_change?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone_change_token?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  phone_change_sent_at?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  confirmed_at?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email_change_token_current?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  email_change_confirm_status?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  banned_until?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reauthentication_token?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  reauthentication_sent_at?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  is_sso_user?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  deleted_at?: Date;
}
