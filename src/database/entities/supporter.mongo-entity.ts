import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('Supporter')
export class SupporterEntity{
    @ObjectIdColumn()
    id: ObjectId;

    @Column({ length: 255})
    personType: string;

    @Column({ length: 255 })
    name: string;

    @Column({length: 255})
    surname: string;

    @Column({length: 255})
    phone: string;

    @Column({ length: 255})
    email: string;

    @Column({ length: 500})
    message: string;

}