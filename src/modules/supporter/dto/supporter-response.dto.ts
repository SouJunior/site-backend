import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class SupporterResponseDTO {
  @ApiProperty()
  id: ObjectId;

  @ApiPropertyOptional()
  expertiseAreas?: string;

  @ApiPropertyOptional()
  institution?: string;

  @ApiProperty()
  contactAgreement: boolean;

  @ApiPropertyOptional()
  describeLinks?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  opportunitiesDescription?: string;

  @ApiPropertyOptional()
  otherSupport?: string;

  @ApiProperty()
  personType: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  suggestion: string;

  @ApiProperty()
  supportOptions: string;

  @ApiProperty()
  termsAgreement: boolean;

  @ApiProperty()
  volunteerMotivation: string;

  @ApiProperty()
  volunteeringAgreement: boolean;

  @ApiProperty()
  hasWhatsApp: boolean;
}
