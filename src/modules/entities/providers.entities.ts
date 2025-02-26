import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Location } from './location.entities';
import { ProviderImage } from './providerImage.entities';
import { Rating } from './ratings.entities';
import { Reports } from './reports.entities';
import { TotalReview } from './totalReview.entities';
import { Section } from './section.entities';
import { Wishlist } from './wishlist.entities';
import { SkippedReview } from './skippedReview.entities';
import { SocialMedia } from './socialMedia.entities';
import { Phone } from './phone.entities';

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

  @OneToMany(() => Section, section => section.provider)
  section: Section[];

  @OneToMany(() => SocialMedia, social => social.provider)
  socialMedia: SocialMedia[];

  @OneToMany(() => Phone, phone => phone.provider)
  phoneNumber: Phone[];

  @OneToOne(() => Rating, rating => rating.provider)
  @JoinColumn()
  rating: Rating;

  @Column("simple-array")
  services: string[];

  @Column({ nullable: true })
  tags: string;

  miles?: number;

  @OneToMany(() => Location, location => location.provider)
  locations: Location[];

  @Column({ nullable: true, default: true })
  isActive: boolean;

  @OneToOne(() => TotalReview, (totalReview) => totalReview.provider)
  @JoinColumn()
  totalReview: TotalReview;

  @Column({ default: false })
  isSponsored: boolean;

  @OneToMany(() => Wishlist, wishlist => wishlist.provider)
  wishlist: Wishlist;

  @OneToMany(() => SkippedReview, skippedReview => skippedReview.provider)
  skippedReviews: SkippedReview[];

}
