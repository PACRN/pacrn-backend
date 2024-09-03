import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Provider } from './providers.entities';


@Entity()
export class Location {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  postalCode: string;

  @Column("float")
  latitude: number;

  @Column("float")
  longitude: number;

  @Column()
  providerCode: string;

  @Column({default: false})
  isSecondary: boolean;

  @Column()
  addressTypeId: number;

  @ManyToOne(() => Provider, provider => provider.locations)
  @JoinColumn({ name: 'providerCode', referencedColumnName: 'code' })
  provider: Provider;
  
}
