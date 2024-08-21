import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Provider } from "./providers.entities";

@Entity()
export class Tags {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 255 })
    tagname: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image?: string;

    @ManyToMany(() => Provider, provider => provider.tags)
    providers: Provider[];
}
