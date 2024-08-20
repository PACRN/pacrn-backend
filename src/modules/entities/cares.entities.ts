import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Tenant } from "./tenant.entities";

@Entity()
export class Cares {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'bigint' })
    tenantId: number;

    @ManyToOne(() => Tenant)
    @JoinColumn({ name: 'tenantId' })
    tenant: Tenant;
}
