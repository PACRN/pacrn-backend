import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Provider } from "./providers.entities";

@Entity()
export class Reports {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    category: string;

    @Column({ type: 'varchar', nullable: true })
    description?: string;

    @Column()
    code: string;

    @ManyToOne(() => Provider, provider => provider.reports)
    @JoinColumn({ name: 'code', referencedColumnName: 'code' })
    provider: Provider;

    @Column({ type: 'boolean', default: false })
    isResolved?: boolean;
}
