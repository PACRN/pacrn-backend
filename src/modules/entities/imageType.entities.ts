import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ImageType {

    @PrimaryColumn()
    id: number;

    @Column()
    typeName: string;

}