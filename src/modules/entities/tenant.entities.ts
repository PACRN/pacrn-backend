import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { TenantConfigurations } from "./tenantConfigurations.entities";
import { Subscriptions } from "./subscriptions.entities";

@Entity()
export class Tenant {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'bigint' })
    styleId: number;

    @Column({ type: 'varchar', length: 255 })
    adminName: string;

    @Column({ type: 'varchar', length: 255 })
    adminEmail: string;

    @Column({ type: 'bigint' })
    subscriptionId: number;

    @ManyToOne(() => TenantConfigurations)
    @JoinColumn({ name: 'styleId' })
    style: TenantConfigurations;

    @ManyToOne(() => Subscriptions)
    @JoinColumn({ name: 'subscriptionId' })
    subscription: Subscriptions;
}
