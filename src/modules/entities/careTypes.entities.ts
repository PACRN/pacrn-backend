import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Cares } from './cares.entities';

@Entity()
export class CareType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Cares, cares => cares.id)
  @JoinColumn()
  care: Cares;
}
