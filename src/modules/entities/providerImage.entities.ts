import { Column, Entity, OneToOne, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { ImageType } from "./imageType.entities";
import { Provider } from "./providers.entities";

@Entity()
export class ProviderImage {
  @PrimaryGeneratedColumn('increment')
  id: number; // Use PrimaryGeneratedColumn to auto-increment id

  @Column()
  providerCode: string;

  @Column()
  imagePath: string;

  @Column()
  imageCaption: string;

  @Column()
  imageOrder: number;

  @Column()
  imageTypeId: number; 

  @ManyToOne(() => Provider, provider => provider.images)
  @JoinColumn({ name: 'providerCode', referencedColumnName: 'code' })
  provider: Provider;

  @OneToOne(() => ImageType)
  @JoinColumn({ name: 'imageTypeId', referencedColumnName: 'id' })
  imageType: ImageType;
}
