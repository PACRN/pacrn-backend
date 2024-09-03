import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Provider } from './providers.entities';


@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("float")
  overall: number;

  @Column("float")
  healthInspection: number;

  @Column("float")
  qualityMeasure: number;

  @Column("float")
  staffRating: number;

  @Column("float")
  longStayQuality: number;

}
