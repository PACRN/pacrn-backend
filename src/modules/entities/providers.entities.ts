import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Location } from './location.entities';
import { ProviderImage } from './providerImage.entities';
import { Rating } from './ratings.entities';
import { Reports } from './reports.entities';
import { TotalReview } from './totalReview.entities';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => ProviderImage, providerImage => providerImage.provider)
  images: ProviderImage[];

  @OneToMany(() => Reports, reports => reports.provider)
  reports: Reports[];

  @OneToOne(() => Rating, rating => rating.provider)
  rating: Rating;

  @Column("simple-array")
  services: string[];

  @Column({ nullable: true })
  tags: string;

  miles?: number;

  @OneToMany(() => Location, location => location.provider)
  locations: Location[];

  @Column('geography', { spatialFeatureType: 'Point', srid: 4326, nullable: true })
  location: string;

  @Column({ nullable: true, default: true })
  isActive: boolean;

  @OneToOne(() => TotalReview, (totalReview) => totalReview.provider)
  totalReview: TotalReview;
}
