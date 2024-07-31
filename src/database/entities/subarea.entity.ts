import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Area } from "src/database/entities/area.entity";

@Entity("Subareas")
export class Subarea {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @ManyToOne(() => Area, area => area.subareas)
    area: Area;
}