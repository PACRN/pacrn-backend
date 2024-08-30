import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Provider } from './providers.entities';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  source: string;

  @Column({ type: 'bigint', nullable: true })
  rating: number;

  @Column({ type: 'varchar' })
  review: string;

  @ManyToOne(() => Provider, provider => provider.id)
  provider: Provider;
}
