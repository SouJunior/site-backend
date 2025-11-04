import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('Supporter')
export class SupporterEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ length: 500, nullable: true })
  expertiseAreas?: string;

  @Column({ length: 255, nullable: true })
  institution?: string;

  @Column({ default: true })
  contactAgreement: boolean;

  @Column({ length: 500, nullable: true })
  describeLinks?: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 500, nullable: true })
  opportunitiesDescription?: string;

  @Column({ length: 500, nullable: true })
  otherSupport?: string;

  @Column({ length: 255 })
  personType: string;

  @Column({ length: 255 })
  phone: string;

  @Column()
  hasWhatsApp: boolean;

  @Column({ length: 500 })
  suggestion: string;

  @Column({ length: 255 })
  supportOptions: string;

  @Column({ default: true })
  termsAgreement: boolean;

  @Column({ length: 500 })
  volunteerMotivation: string;

  @Column({ default: true })
  volunteeringAgreement: boolean;
}
