import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
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

  @OneToOne(() => Provider, provider => provider.rating)
  @JoinColumn({ name: 'code', referencedColumnName: 'code' }) // Correctly defines the foreign key column
  provider: Provider;

  @Column("text", { nullable: true })
  moreinfo: string;

  @Column("text", { nullable: true })
  abusereport: string;
}
