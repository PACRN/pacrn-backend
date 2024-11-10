import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Contact {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'text' })
    fullName: string

    @Column({ type: "text" })
    email: string

    @Column({ type: "text" })
    message: string
}