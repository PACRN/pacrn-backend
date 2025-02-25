import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PhoneType } from './phoneType.entities';

@Entity()
export class Phone {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    code: string;

    @Column({ type: "text"})
    phoneNumber: string

    @ManyToOne(() => PhoneType, { nullable: false })
    @JoinColumn({ name: "phoneTypeId" }) // This specifies the foreign key column name
    phoneType: PhoneType;
}