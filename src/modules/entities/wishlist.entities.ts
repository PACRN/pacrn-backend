import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Provider } from "./providers.entities";

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'bigint' })
    customerId: number;

    @Column({ type: 'text' })
    providercode: string;

    @Column({ type: 'bigint', unique: true })  // 🔥 Make providerId unique
    providerId: number;

    @OneToOne(() => Provider, provider => provider.wishlist)  // 🔥 Change to OneToOne
    @JoinColumn({ name: 'providerId' })
    provider: Provider[]
}
