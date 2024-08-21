import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Review } from './reviews.entities';
import { Rating } from './ratings.entities';
import { Location } from './location.entities';


@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  website: string;

  @Column()
  images: string;

  @Column("simple-array")
  services: string[];

  @OneToMany(() => Review, review => review.provider)
  reviews: Review[];

  @Column("simple-array")
  tags: string[];

  @OneToOne(() => Rating, rating => rating.provider, { cascade: true })
  ratings: Rating[];

  @OneToOne(() => Location, location => location.provider, { cascade: true })
  location: Location;

  @Column("simple-array")
  careTypes: string[];
}
