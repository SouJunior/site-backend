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
  id_area: number;

  @Column()
  availability: string;

  @Column()
  turn: boolean;

  @Column()
  start_option: string;

  @Column()
  tools_knowledge: string;

  @Column()
  field_knowledge: string;

  @Column()
  volunteer_motivation: string;

  @Column()
  contact_agreement: boolean;

  @Column()
  terms_agreement: boolean;

  @Column()
  start_date: Date;
}