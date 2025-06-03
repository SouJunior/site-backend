import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Subarea")
export class Subarea {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

}