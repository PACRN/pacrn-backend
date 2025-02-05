import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Provider } from "./providers.entities";

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'bigint' })
    customerId: number;

    @Column({ type: 'text' })
    providercode: string;

    @Column({ type: 'bigint', unique: false })  // 🔥 Make providerId unique
    providerId: number;

    @ManyToOne(() => Provider, provider => provider.wishlist)  // 🔥 Change to OneToOne
    @JoinColumn({ name: 'providerId' })
    provider: Provider[]
}
