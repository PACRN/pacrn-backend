import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reports {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    category: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    description?: string;

    @Column({ type: 'boolean', nullable: true })
    isResolved?: boolean;
}
