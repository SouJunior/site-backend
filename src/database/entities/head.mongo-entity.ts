import { Entity, ObjectIdColumn, ObjectId, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Head')
export class HeadEntity{
    @ObjectIdColumn()
    id: ObjectId;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255})
    email: string;

    @Column({length: 255})
    linkedin: string;

    @Column({})
    indication: boolean;

    @Column({length: 255})
    linkedinIndication: string;

    @Column()
    turn: boolean;

    @Column({length: 255})
    availability: string;

    @Column({length: 255})
    startOption: string;

    @Column()
    startDate: Date;

    @Column()
    area: number;

    @Column()
    subarea: number;

    @Column({length: 255})
    experienceTime: string;

    @Column({length: 500})
    jobExperience: string;

    @Column({length: 500})
    volunteerMotivation: string;

    @Column()
    collaboration: boolean;

    @Column({length: 500})
    otherExperiences: string;

    @Column()
    contactAgreement: boolean;

    @Column()
    volunteeringAgreement: boolean;

    @Column()
    termsAgreement: boolean;

    @CreateDateColumn()  
    createdAt: Date;  
  
    @UpdateDateColumn()  
    updatedAt: Date; 
}