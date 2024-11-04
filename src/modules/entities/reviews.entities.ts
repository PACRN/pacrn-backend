import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TotalReview } from './totalReview.entities';
import { text } from 'aws-sdk/clients/customerprofiles';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar' })
  source: string;

  @Column({ type: 'bigint', nullable: true })
  rating: number;
  @Column({ type: 'text' })
  reviewPeriod: string;

  @Column({ type: 'varchar', nullable: true })
  review: string;
  @Column({ type: 'number' })
  TotalReviewId: number;
  @ManyToOne(() => TotalReview, totalreview => totalreview.review)
  @JoinColumn({ name: 'TotalReviewId', referencedColumnName: 'id' })
  totalReview: TotalReview
}
