import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Tags {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    tagname: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image?: string;
}
