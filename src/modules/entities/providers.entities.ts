import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { CareTypes } from "./careTypes.entities";
import { Ratings } from "./ratings.entities";
import { Reports } from "./reports.entities";
import { Reviews } from "./reviews.entities";
import { Tags } from "./tags.entities";
import { Location } from "./location.entities";
import 'reflect-metadata';


@Entity()
export class Providers {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'bigint' })
    careTypeId: number;

    @Column({ type: 'text' })
    phone: string;

    @Column({ type: 'bigint' })
    locationId: number;

    @Column({ type: 'bigint' })
    tagsId: number;

    @Column({ type: 'text', nullable: true })
    images?: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    website?: string;

    @Column({ type: 'bigint', nullable: true })
    ratingsId?: number;

    @Column({ type: 'bigint', nullable: true })
    reviewsId?: number;

    @Column({ type: 'bigint', nullable: true })
    reportId?: number;

    @Column({ type: 'json' })
    additionalInfo: any;

    @ManyToOne(() => CareTypes)
    @JoinColumn({ name: 'careTypeId' })
    careType?: CareTypes[];

    @ManyToOne(() => Location)
    @JoinColumn({ name: 'locationId' })
    location?: Location;

    @ManyToOne(() => Tags)
    @JoinColumn({ name: 'tagsId' })
    tags?: Tags[];

    @OneToOne(() => Ratings)
    @JoinColumn({ name: 'ratingsId' })
    ratings?: Ratings;

    @OneToOne(() => Reviews)
    @JoinColumn({ name: 'reviewsId' })
    reviews?: Reviews[];

    @OneToOne(() => Reports)
    @JoinColumn({ name: 'reportId' })
    report?: Reports[];
}
