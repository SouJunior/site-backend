import { OneToMany, Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Subarea } from "./subarea.entity";

@Entity("areas")
export class Area {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Subarea, subarea => subarea.area)
    subareas: Subarea[];
}