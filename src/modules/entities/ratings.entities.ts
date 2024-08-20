import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Ratings {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int', nullable: true })
    overall?: number;

    @Column({ type: 'int', nullable: true })
    healthInspection?: number;

    @Column({ type: 'int', nullable: true })
    qualityMeasure?: number;

    @Column({ type: 'int', nullable: true })
    staffRating?: number;

    @Column({ type: 'int', nullable: true })
    longStayQuality?: number;
}
