import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
export class HeadResponseDTO {
  @ApiProperty()
  id: ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  linkedin: string;

  @ApiProperty()
  indication: boolean;

  @ApiProperty()
  linkedinIndication: string;

  @ApiProperty()
  turn: boolean;

  @ApiProperty()
  availability: string;

  @ApiProperty()
  startOption: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  area: number;

  @ApiProperty()
  subarea: number;

  @ApiProperty()
  experienceTime: string;

  @ApiProperty()
  jobExperience: string;

  @ApiProperty()
  volunteerMotivation: string;

  @ApiProperty()
  collaboration: boolean;

  @ApiProperty()
  otherExperiences: string;

  @ApiProperty()
  contactAgreement: boolean;

  @ApiProperty()
  volunteeringAgreement: boolean;

  @ApiProperty()
  termsAgreement: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
