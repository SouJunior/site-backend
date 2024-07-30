import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("areas")
export class Area {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}