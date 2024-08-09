import { cp } from 'fs';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Area } from './area.entity';
import { Subarea } from './subarea.entity';

@Entity()
export class MentorEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({length: 255})
  name: string;

  @Column({length: 255})
  email: string;

  @Column({length: 255})
  linkedin: string;

  @ManyToOne(() => Area)
  @JoinColumn({ name: 'id_area' })
  id_area: Area;

  @ManyToOne(() => Subarea)
  @JoinColumn({ name: 'id_subarea' })
  id_subarea: Subarea;

  @Column({length: 255})
  availability: string;

  @Column()
  turn: string;

  @Column({length: 255})
  start_option: string;

  @Column()
  experiece_time: string;

  @Column('text')
  job_experience: string;

  @Column('text')
  mentor_experience: string;

  @Column()
  contact_agreement: boolean;

  @Column()
  terms_agreement: boolean;

  @Column()
  inicio: Date;
}
