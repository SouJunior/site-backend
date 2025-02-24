import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('Supporter')
export class SupporterEntity {
    @ObjectIdColumn()
    id: ObjectId;

    @Column({ length: 255})
    personType: string;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255, nullable: true })
    institution?: string;

    @Column({ length: 255 })
    phone: string;

    @Column({ length: 255 })
    email: string;

    @Column()
    hasWhatsApp: boolean;

    @Column({ length: 255 })
    supportType: string;

    @Column({ length: 500, nullable: true })
    linksForSupport?: string;

    @Column({ length: 500, nullable: true })
    expertiseAreas?: string;

    @Column({ length: 500, nullable: true })
    opportunitiesDescription?: string;

    @Column({ length: 500, nullable: true })
    otherSupportWays?: string;

    @Column({ length: 500 })
    suggestion: string;

    @Column({ length: 500 })
    motivation: string;

    @Column({ default: true })
    agreesWithTerms: boolean;

    @Column({ default: true })
    agreesWithNonProfit: boolean;

    @Column({ default: true })
    agreesWithContact: boolean;
}