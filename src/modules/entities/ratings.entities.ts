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

  @Column("float")
  shortStatyQuality: number;

  @Column({ unique: true })
  code: string;

  @Column("text")
  moreinfo: string;

  @Column("text")
  abusereport: string;
}
