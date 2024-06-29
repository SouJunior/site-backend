import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('auth.users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ nullable: true })
  instance_id: string;

  @Column()
  aud: string;

  @Column({ nullable: true })
  role: string;

  @Column()
  email: string;

  @Column()
  encrypted_password: string;

  @Column({ nullable: true })
  email_confirmed_at: Date;

  @Column({ nullable: true })
  invited_at: Date;

  @Column({ nullable: true })
  confirmation_token: string;

  @Column({ nullable: true })
  confirmation_sent_at: Date;

  @Column({ nullable: true })
  recovery_token: string;

  @Column({ nullable: true })
  recovery_sent_at: Date;

  @Column({ nullable: true })
  email_change_token_new: string;

  @Column({ nullable: true })
  email_change: string;

  @Column({ nullable: true })
  email_change_sent_at: Date;

  @Column({ nullable: true })
  last_sign_in_at: Date;

  @Column({ nullable: true })
  is_super_admin: boolean;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  phone_confirmed_at: Date;

  @Column({ nullable: true })
  phone_change: string;

  @Column({ nullable: true })
  phone_change_token: string;

  @Column({ nullable: true })
  phone_change_sent_at: Date;

  @Column({ nullable: true })
  confirmed_at: Date;

  @Column({ nullable: true })
  email_change_token_current: string;

  @Column({ nullable: true })
  email_change_confirm_status: number;

  @Column({ nullable: true })
  banned_until: Date;

  @Column({ nullable: true })
  reauthentication_token: string;

  @Column({ nullable: true })
  reauthentication_sent_at: Date;

  @Column({ default: false })
  is_sso_user: boolean;

  @Column({ nullable: true })
  deleted_at: Date;
}
