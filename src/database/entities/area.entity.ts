import { OneToMany, Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Subarea } from "./subarea.entity";

@Entity("Areas")
export class Area {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Subarea, subarea => subarea.area)
    subareas: Subarea[];
}