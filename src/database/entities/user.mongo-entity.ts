import { Entity, Column, ObjectIdColumn, ObjectId, CreateDateColumn, UpdateDateColumn } from 'typeorm';

enum RolesEnum{
  ADMIN = "ADMIN",
  USER = "USER"
}

@Entity('Users')
export class UserEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  ip?: string;

  @Column({
    type: 'enum',
    enum: ['ADMIN', 'USER'],
    default: RolesEnum.USER
   })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ update: true})
  updatedAt: Date;

  @Column({ default: false })
  mailConfirm: boolean;

  @Column({ nullable: true })
  recoverPasswordToken?: string;
}
