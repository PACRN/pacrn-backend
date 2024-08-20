import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Cares } from "./cares.entities";

@Entity()
export class CareTypes {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'char', length: 255 })
    careType: string;

    @Column({ type: 'bigint' })
    careId: number;

    @ManyToOne(() => Cares)
    @JoinColumn({ name: 'careId' })
    care: Cares;
}
