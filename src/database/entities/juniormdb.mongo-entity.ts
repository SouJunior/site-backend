import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('JuniorsMDB')
export class JuniorMDBEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  linkedin: string;

  @Column()
  area: number;

  @Column()
  subarea: number;

  @Column()
  indication: boolean;

  @Column()
  linkedinIndication: string;

  @Column()
  availability: string;

  @Column()
  turn: boolean;

  @Column()
  otherExperiences: string;

  @Column()
  startOption: string;

  @Column()
  toolsKnowledge: string;

  @Column()
  fieldKnowledge: string;

  @Column()
  volunteerMotivation: string;

  @Column()
  contactAgreement: boolean;

  @Column()
  termsAgreement: boolean;

  @Column()
  startDate: Date;
}