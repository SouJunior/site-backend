import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subarea {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;
}