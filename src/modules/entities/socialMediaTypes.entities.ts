import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SocialMedia } from "./socialMedia.entities";

@Entity()
export class SocialMediaType {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({unique: true})
    typeName: string;

    @OneToMany(() => SocialMedia, socialMedia => socialMedia.socialMediaType)
    phones: SocialMedia[];

}