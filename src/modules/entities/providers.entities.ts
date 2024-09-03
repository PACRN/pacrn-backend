import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Location } from './location.entities';
import { ProviderImage } from './providerImage.entities';


@Entity()
export class Provider {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;

  @OneToMany(() => ProviderImage, providerImage => providerImage.providerCode)
  images: ProviderImage[];

  @Column("simple-array")
  services: string[];

  @Column({ nullable: true })
  tags: string;

  miles?: number;

  @OneToMany(() => Location, location => location.provider)
  locations: Location[];
}
