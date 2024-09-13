import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  role: string;

  @Column()
  email: string;

  @Column()
  encrypted_password: string;

  @Column({ nullable: true })
  email_confirmed_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
