import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SocialMediaType } from './socialMediaTypes.entities';

@Entity()
export class SocialMedia {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    code: string;

    @Column({ type: "text"})
    socialMediaLink: string

    @ManyToOne(() => SocialMediaType, { nullable: false })
    @JoinColumn({ name: "socialMediaTypeId" }) // This specifies the foreign key column name
    socialMediaType: SocialMediaType;
}