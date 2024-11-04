import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Provider } from './providers.entities';
import { Review } from './reviews.entities';

@Entity()
export class TotalReview {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ type: 'text' })
    totalRating: string;
    @Column({ type: "text" })
    totalReviews: string;
    @Column({ type: "text" })
    @Column({ type: 'text', unique: true })
    providerCode: string;
    @OneToOne(() => Provider, provider => provider.totalReview)
    @JoinColumn({ name: 'providerCode', referencedColumnName: 'code' })
    provider: Provider;
    @OneToMany(() => Review, (review) => review.totalReview)
    review: Review[]
}