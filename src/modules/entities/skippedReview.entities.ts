import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Provider } from './providers.entities';

@Entity()
export class SkippedReview {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column({ type: 'text', unique: true })
    providerCode: string;
    @ManyToOne(() => Provider, provider => provider.skippedReviews) // Many SkippedReview -> One Provider
    @JoinColumn({ name: 'providerCode', referencedColumnName: 'code' }) // Explicit foreign key mapping
    provider: Provider;
}