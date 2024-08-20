import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Wishlist {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'bigint' })
    customerId: number;

    @Column({ type: 'bigint' })
    providerId: number;
}
