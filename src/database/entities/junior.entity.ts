import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Area } from "./area.mongo-entity";
import { Subarea } from "./subarea.mongo-entity";

@Entity("Juniors")
export class JuniorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 255 })
    linkedin: string;

    @ManyToOne(() => Area)
    @JoinColumn({ name: 'id_area' })
    id_area: Area;

    @ManyToOne(() => Subarea)
    @JoinColumn({ name: 'id_subarea' })
    id_subarea: Subarea;

    @Column({ length: 255 })
    availability: string;

    @Column()
    turn: boolean;

    @Column({ length: 255 })
    start_option: string;

    @Column('text')
    tools_knowledge: string;

    @Column('text')
    field_knowledge: string;

    @Column('text')
    volunteer_motivation: string;

    @Column()
    contact_agreement: boolean;

    @Column()
    terms_agreement: boolean;

    @Column('date')
    start_date: Date;

}