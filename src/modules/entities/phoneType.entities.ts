import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Phone } from "./phone.entities";

@Entity()
export class PhoneType {

    @PrimaryColumn()
    id: number;

    @Column({unique: true})
    typeName: string;

    @OneToMany(() => Phone, phone => phone.phoneType)
    phones: Phone[];

}