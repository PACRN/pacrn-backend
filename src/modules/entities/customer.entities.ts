import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Tenant } from "./tenant.entities";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255 })
    phone: string;

    @Column({ type: 'boolean' })
    verified: boolean;

    @Column({ type: 'bigint' })
    tenantId: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    profileImage?: string;

    @ManyToOne(() => Tenant)
    @JoinColumn({ name: 'tenantId' })
    tenant: Tenant;
}
