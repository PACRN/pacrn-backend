import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class AddressType {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    addressTypeName: string;

    @Column()
    description: string;
}