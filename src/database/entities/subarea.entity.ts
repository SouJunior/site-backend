import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Area } from "src/database/entities/area.entity";

@Entity("Subareas")
export class Subarea {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Area, area => area.subareas)
    @JoinColumn({ name: 'id_area' })
    area: Area;
}