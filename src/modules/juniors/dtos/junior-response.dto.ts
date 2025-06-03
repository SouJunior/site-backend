import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class JuniorResponseDTO {
  @ApiProperty()
  id: ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  linkedin: string;

  @ApiProperty()
  area: number;

  @ApiProperty()
  subarea: number;

  @ApiProperty()
  indication: boolean;

  @ApiProperty()
  linkedinIndication: string;

  @ApiProperty()
  availability: string;

  @ApiProperty()
  turn: boolean;

  @ApiProperty()
  otherExperiences: string;

  @ApiProperty()
  startOption: string;

  @ApiProperty()
  toolsKnowledge: string;

  @ApiProperty()
  fieldKnowledge: string;

  @ApiProperty()
  volunteerMotivation: string;

  @ApiProperty()
  contactAgreement: boolean;

  @ApiProperty()
  termsAgreement: boolean;

  @ApiProperty()
  startDate: Date;
}
