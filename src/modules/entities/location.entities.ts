import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Provider } from './providers.entities';


@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doorNo: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  zipcode: string;

  @Column("float")
  latitude: number;

  @Column("float")
  longitude: number;

  @OneToOne(() => Provider, provider => provider.location)
  @JoinColumn()
  provider: Provider;
  
}
