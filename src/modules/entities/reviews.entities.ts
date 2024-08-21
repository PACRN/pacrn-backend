import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Provider } from './providers.entities';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  source: string;

  @Column("float")
  rating: number;

  @Column()
  review: string;

  @ManyToOne(() => Provider, provider => provider.reviews)
  provider: Provider;
}
