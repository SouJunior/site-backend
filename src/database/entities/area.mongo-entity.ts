import { OneToMany, Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Subarea } from "./subarea.mongo-entity";

@Entity("Area")
export class Area {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}