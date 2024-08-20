import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Subscriptions {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'bigint' })
    pricing: number;
}
