import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Reviews {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    source: string;

    @Column({ type: 'varchar', length: 255 })
    description: string;

    @Column({ type: 'bigint', nullable: true })
    rating?: number;
}
