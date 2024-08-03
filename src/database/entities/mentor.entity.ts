import { cp } from 'fs';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MentorEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  confirm_email: string;

  @Column()
  linkedin: string;

  @Column()
  area: string;

  @Column()
  subarea: number;

  @Column()
  availability: string;

  @Column()
  turn: string;

  @Column()
  start_option: string;

  @Column()
  job_experience: string;

  @Column()
  mentor_experience: string;

  @Column()
  volunteer_motivation: string;

  @Column()
  contact_agreement: boolean;

  @Column()
  terms_agreement: boolean;

  @Column()
  inicio: Date;
}
