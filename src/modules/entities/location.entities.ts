import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    doorNo: string;

    @Column({ type: 'varchar', length: 255 })
    street: string;

    @Column({ type: 'varchar', length: 255 })
    city: string;

    @Column({ type: 'varchar', length: 255 })
    state: string;

    @Column({ type: 'varchar', length: 255 })
    country: string;

    @Column({ type: 'varchar', length: 255 })
    zipcode: string;

    @Column({ type: 'varchar', length: 255 })
    latitude: string;

    @Column({ type: 'varchar', length: 255 })
    longitude: string;
}
