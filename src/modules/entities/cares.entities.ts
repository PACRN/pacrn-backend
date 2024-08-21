import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Tenant } from "./tenant.entities";
import { CareType } from "./careTypes.entities";

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

    @OneToMany(() => CareType, careType => careType.care)
    @JoinColumn()
    careTypes: CareType[];
}
